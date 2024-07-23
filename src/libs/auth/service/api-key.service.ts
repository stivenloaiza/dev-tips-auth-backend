import {
  Injectable,
  NotFoundException,
  Logger,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ApiKey, ApiKeyDocument } from '../entities/api-key.entity';
import { CreateApiKeyDto } from '../dtos/createApiKey.dto';
import { UpdateApiKeyDto } from '../dtos/updateApiKey.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(ApiKey.name) private apiKeyModel: Model<ApiKeyDocument>,
  ) {}

  async createApiKey(
    createApiKeyDto: CreateApiKeyDto,
  ): Promise<{ key: string; isActive: boolean }> {
    try {
      const key = await this.generateApiKey();
      const hashedKey = await bcrypt.hash(key, 10);
      const newApiKey = new this.apiKeyModel({
        ...createApiKeyDto,
        key: hashedKey,
      });
      await newApiKey.save();
      return { key, isActive: newApiKey.isActive };
    } catch (error) {
      this.logger.error('Error creating API key', error.stack);
      throw new InternalServerErrorException('Error creating API key');
    }
  }

  async getApiKey(id: string): Promise<ApiKey> {
    try {
      const apiKey = await this.apiKeyModel.findById(id).exec();
      if (!apiKey) {
        throw new NotFoundException('API Key not found');
      }
      return apiKey;
    } catch (error) {
      this.logger.error(`Error getting API key with id: ${id}`, error.stack);
      throw new InternalServerErrorException('Error getting API key');
    }
  }

  async updateApiKey(
    id: string,
    updateApiKeyDto: UpdateApiKeyDto,
  ): Promise<ApiKey> {
    try {
      const updatedApiKey = await this.apiKeyModel
        .findByIdAndUpdate(id, updateApiKeyDto, { new: true })
        .exec();
      if (!updatedApiKey) {
        throw new NotFoundException('API Key not found');
      }
      return updatedApiKey;
    } catch (error) {
      this.logger.error(`Error updating API key with id: ${id}`, error.stack);
      throw new InternalServerErrorException('Error updating API key');
    }
  }

  async revokeApiKey(id: string): Promise<void> {
    try {
      const apiKey = await this.apiKeyModel.findById(id).exec();
      if (!apiKey) {
        throw new NotFoundException('API Key not found');
      }
      apiKey.isActive = false;
      await apiKey.save();
    } catch (error) {
      this.logger.error(`Error revoking API key with id: ${id}`, error.stack);
      throw new InternalServerErrorException('Error revoking API key');
    }
  }

  async findAll(page: number = 1, limit: number = 10): Promise<ApiKey[]> {
    try {
      const apiKeys = await this.apiKeyModel
        .find({ isActive: true })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      if (!apiKeys.length) {
        throw new NotFoundException('No API keys found');
      }
      return apiKeys;
    } catch (error) {
      this.logger.error('Error retrieving API keys', error.stack);
      throw new InternalServerErrorException('Error retrieving API keys');
    }
  }

  async validateApiKey(key: string): Promise<boolean> {
    try {
      const apiKeys = await this.apiKeyModel.find({ isActive: true }).exec();
      for (const apiKey of apiKeys) {
        const isMatch = await bcrypt.compare(key, apiKey.key);
        if (isMatch) {
          if (
            apiKey.maxUsage !== null &&
            apiKey.usageCount >= apiKey.maxUsage
          ) {
            await this.deactivateApiKey(apiKey);
            this.logger.warn(`API key usage limit reached: ${key}`);
            throw new ForbiddenException('API key usage limit reached');
          }
          await this.incrementUsageCount(apiKey);
          await this.updateLastUsed(apiKey.id);
          this.logger.log(`API key matched and validated`);
          return true;
        }
      }
      return false;
    } catch (error) {
      this.logger.error('Error validating API key', error.stack);
      throw new InternalServerErrorException('Error validating API key');
    }
  }

  private async incrementUsageCount(apiKey: ApiKeyDocument): Promise<void> {
    apiKey.usageCount++;
    await apiKey.save();
  }

  private async deactivateApiKey(apiKey: ApiKeyDocument): Promise<void> {
    apiKey.isActive = false;
    await apiKey.save();
  }

  private async updateLastUsed(apiKeyId: string): Promise<void> {
    try {
      await this.apiKeyModel
        .findOneAndUpdate({ _id: apiKeyId }, { lastUsedAt: new Date() })
        .exec();
    } catch (error) {
      this.logger.error(
        `Error updating lastUsedAt for id: ${apiKeyId}`,
        error.stack,
      );
      throw new InternalServerErrorException('Error updating lastUsedAt');
    }
  }

  private async generateApiKey(): Promise<string> {
    try {
      return await [...Array(30)]
        .map(() => ((Math.random() * 36) | 0).toString(36))
        .join('');
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
