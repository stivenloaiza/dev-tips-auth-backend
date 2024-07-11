import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  ApiKeySubscription,
  ApiKeySubscriptionDocument,
} from "../entities/apiKeySubs.entity";
import { CreateApiKeySubscriptionDto } from "../dtos/create-apy-key-subs.dto";
import { UpdateApiKeySubscriptionDto } from "../dtos/update-apy-key-subs.dto";

@Injectable()
export class ApiKeySubscriptionService {
  constructor(
    @InjectModel(ApiKeySubscription.name)
    private apiKeySubscriptionModel: Model<ApiKeySubscriptionDocument>
  ) {}

  async generateApiKey(type: string): Promise<string> {
    let apiKey = `${type}-${Math.random().toString(36).substr(2, 7)}`;
    if (type === "tv") {
      while (apiKey.length > 9) {
        apiKey = `${type}-${Math.random().toString(36).substr(2, 7)}`;
      }
    }

    return apiKey;
  }

  async validateApiKey(apiKey: string): Promise<boolean> {
    const apiKeySubscription = await this.apiKeySubscriptionModel.findOne({
      apiKey,
    });

    if (apiKeySubscription) {
      apiKeySubscription.usageCount++;
      await apiKeySubscription.save();
      return true;
    }

    return false;
  }

  async cancelSubscription(type: string): Promise<void> {
    await this.apiKeySubscriptionModel.updateMany(
      { type },
      { isActive: false }
    );
  }

  async deactivateApiKey(apiKey: string): Promise<void> {
    await this.apiKeySubscriptionModel.updateOne(
      { apiKey },
      { isActive: false }
    );
  }

  async createApiKeySubscription(
    createApiKeySubscriptionDto: CreateApiKeySubscriptionDto
  ): Promise<ApiKeySubscription> {
    const apiKey = await this.generateApiKey(createApiKeySubscriptionDto.type);
    const createdApiKeySubscription = new this.apiKeySubscriptionModel({
      ...createApiKeySubscriptionDto,
      apiKey,
      createdAt: new Date(),
    });
    return createdApiKeySubscription.save();
  }

  async updateApiKeySubscription(
    apiKey: string,
    updateApiKeySubscriptionDto: UpdateApiKeySubscriptionDto
  ): Promise<ApiKeySubscription> {
    const updatedSubscription = await this.apiKeySubscriptionModel.findOneAndUpdate(
      { apiKey },
      { $set: updateApiKeySubscriptionDto },
      { new: true }
    );
    return updatedSubscription;
  }

  async deleteApiKeySubscription(apiKey: string): Promise<ApiKeySubscription> {
    const deletedSubscription = await this.apiKeySubscriptionModel.findOneAndDelete(
      { apiKey }
    );
    return deletedSubscription;
  }

  async findAll(): Promise<ApiKeySubscription[]> {
    return this.apiKeySubscriptionModel.find().exec();
  }

  async findOne(apiKey: string): Promise<ApiKeySubscription> {
    return this.apiKeySubscriptionModel.findOne({ apiKey }).exec();
  }
}
