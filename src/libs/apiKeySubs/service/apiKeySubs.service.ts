import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ApiKeySubscription,
  ApiKeySubscriptionDocument,
} from '../entities/apiKeySubs.entity';
import { CreateApiKeySubscriptionDto } from '../dtos/create-apy-key-subs.dto';

@Injectable()
export class ApiKeySubscriptionService {
  private readonly logger = new Logger(ApiKeySubscriptionService.name);

  constructor(
    @InjectModel(ApiKeySubscription.name)
    private apiKeySubscriptionModel: Model<ApiKeySubscriptionDocument>,
  ) {}

  private async generateApiKey(type: string): Promise<string> {
    try {
      const length = type === 'tvs' ? 15 : 30;
      return await [...Array(length)]
        .map(() => ((Math.random() * 36) | 0).toString(36))
        .join('');
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async create(
    createApiKeySubscriptionDto: CreateApiKeySubscriptionDto,
  ): Promise<ApiKeySubscription> {
    try {
      const { typeSubscription, limit } = createApiKeySubscriptionDto;
      const apiKey = await this.generateApiKey(typeSubscription);
      const newApiKeySubscription = await new this.apiKeySubscriptionModel({
        typeSubscription,
        apiKey,
        limit,
      });
      const savedApiKey = await newApiKeySubscription.save();

      // Validar la API key después de su creación
      await this.validateApiKey(apiKey);

      return await savedApiKey;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async validateApiKey(apiKey: string): Promise<boolean> {
    try {
      if (!apiKey) {
        this.logger.warn('API key is missing');
        return false;
      }

      this.logger.log(`Validating API key: ${apiKey}`);
      const apiKeySubscription = await this.apiKeySubscriptionModel
        .findOne({ apiKey, isActive: true })
        .exec();

      if (!apiKeySubscription) {
        this.logger.warn(`API key not found or not active: ${apiKey}`);
        return false;
      }

      if (apiKeySubscription.usageCount < apiKeySubscription.limit) {
        apiKeySubscription.usageCount += 1;
        await apiKeySubscription.save();
        this.logger.log(`API key usage updated: ${apiKey}`);
        return true;
      } else {
        apiKeySubscription.isActive = false;
        await apiKeySubscription.save();
        this.logger.warn(
          `API key usage limit reached and deactivated: ${apiKey}`,
        );
        return false;
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getApiKeys(
    limit: number,
    typeSubscription: string,
  ): Promise<ApiKeySubscription[]> {
    try {
      return await this.apiKeySubscriptionModel
        .find({ typeSubscription, isActive: true })
        .limit(limit)
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async cancelApiKey(id: string): Promise<void> {
    try {
      await this.apiKeySubscriptionModel
        .findByIdAndUpdate(id, { isActive: false })
        .exec();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
