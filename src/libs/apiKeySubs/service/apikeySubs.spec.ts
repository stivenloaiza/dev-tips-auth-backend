import { ApiKeySubscriptionService } from './apikeySubs.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ApiKeySubscription } from '../entities/apiKeySubs.entity';
import { CreateApiKeySubscriptionDto } from '../dtos/create-apy-key-subs.dto';
import { InternalServerErrorException } from '@nestjs/common';

describe('ApiKeySubscriptionService', () => {
  let service: ApiKeySubscriptionService;
  let apiKeySubscriptionModel: any;

  beforeEach(async () => {
    apiKeySubscriptionModel = {
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      limit: jest.fn(),
      exec: jest.fn(),
      findByIdAndUpdate: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiKeySubscriptionService,
        {
          provide: getModelToken(ApiKeySubscription.name),
          useValue: apiKeySubscriptionModel,
        },
      ],
    }).compile();

    service = module.get<ApiKeySubscriptionService>(ApiKeySubscriptionService);
  });

  describe('generateApiKey', () => {
    it('should generate a 6 character API key for type "tvs"', async () => {
      const apiKey = await service['generateApiKey']('tvs');
      expect(apiKey).toHaveLength(6);
    });

    it('should generate a 20 character API key for other types', async () => {
      const apiKey = await service['generateApiKey']('other');
      expect(apiKey).toHaveLength(20);
    });
  });

  describe('create', () => {
    it('should throw an InternalServerErrorException if generateApiKey fails', async () => {
      const createApiKeySubscriptionDto: CreateApiKeySubscriptionDto = {
        type: 'tvs',
        limit: 10,
      };

      jest
        .spyOn(service, 'generateApiKey')
        .mockRejectedValue(new Error('test error'));

      await expect(service.create(createApiKeySubscriptionDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('should throw an InternalServerErrorException if save fails', async () => {
      const createApiKeySubscriptionDto: CreateApiKeySubscriptionDto = {
        type: 'tvs',
        limit: 10,
      };

      const generatedApiKey = 'abc123';

      jest.spyOn(service, 'generateApiKey').mockResolvedValue(generatedApiKey);

      apiKeySubscriptionModel.save.mockRejectedValue(new Error('save error'));

      await expect(service.create(createApiKeySubscriptionDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });

    it('should throw an InternalServerErrorException if validateApiKey fails', async () => {
      const createApiKeySubscriptionDto: CreateApiKeySubscriptionDto = {
        type: 'tvs',
        limit: 10,
      };

      const generatedApiKey = 'abc123';
      const savedApiKeySubscription = {
        type: 'tvs',
        apiKey: generatedApiKey,
        limit: 10,
      };

      jest.spyOn(service, 'generateApiKey').mockResolvedValue(generatedApiKey);

      apiKeySubscriptionModel.save.mockResolvedValue(savedApiKeySubscription);

      jest
        .spyOn(service, 'validateApiKey')
        .mockRejectedValue(new Error('validate error'));

      await expect(service.create(createApiKeySubscriptionDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
