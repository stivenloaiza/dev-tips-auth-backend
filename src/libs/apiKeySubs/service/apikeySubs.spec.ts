import { ApiKeySubscriptionService } from './apikeySubs.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ApiKeySubscription } from '../entities/apiKeySubs.entity';
import { CreateApiKeySubscriptionDto } from '../dtos/create-apy-key-subs.dto';
import { InternalServerErrorException, Logger } from '@nestjs/common';

export const apiKeySubscriptionModelMock = {
    findByIdAndUpdate: jest.fn(),
  };

export const mockCreateApiKeySubscriptionDto: CreateApiKeySubscriptionDto = {
    type: 'premium',
    apiKey: 'mockApiKey123',
    usageCount: 5,
    limit: 50,
    isActive: true,
    createdAt: new Date(),
    createBy: 'testUser',
    updatedAt: new Date(),
    updateBy: 'testUser2',
    deletedAt: null,
    deleteBy: null,
  };

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

  describe('validateApiKey', () => {
    it('should return false and log a warning if the API key is missing', async () => {
      const loggerWarnSpy = jest.spyOn(Logger.prototype, 'warn');
      const result = await service.validateApiKey('');
      expect(result).toBe(false);
      expect(loggerWarnSpy).toHaveBeenCalledWith('API key is missing');
    });
  
    it('should return false and log a warning if the API key is not found or not active', async () => {
      apiKeySubscriptionModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });
      const loggerWarnSpy = jest.spyOn(Logger.prototype, 'warn');
      const result = await service.validateApiKey('invalidApiKey');
      expect(result).toBe(false);
      expect(loggerWarnSpy).toHaveBeenCalledWith('API key not found or not active: invalidApiKey');
    });
  
    it('should return true and update the usage count if the API key is valid and usage count is within limit', async () => {
      const apiKeySubscription = {
        usageCount: 0,
        limit: 10,
        isActive: true,
        save: jest.fn().mockResolvedValue(true),
      };
      apiKeySubscriptionModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(apiKeySubscription),
      });
      const result = await service.validateApiKey('validApiKey');
      expect(result).toBe(true);
      expect(apiKeySubscription.usageCount).toBe(1);
      expect(apiKeySubscription.save).toHaveBeenCalled();
    });
  
    it('should return false and deactivate the API key if usage count exceeds limit', async () => {
      const apiKeySubscription = {
        usageCount: 10,
        limit: 10,
        isActive: true,
        save: jest.fn().mockResolvedValue(true),
      };
      apiKeySubscriptionModel.findOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue(apiKeySubscription),
      });
      const result = await service.validateApiKey('validApiKey');
      expect(result).toBe(false);
      expect(apiKeySubscription.isActive).toBe(false);
      expect(apiKeySubscription.save).toHaveBeenCalled();
    });
  
    it('should throw an InternalServerErrorException if an error occurs', async () => {
      apiKeySubscriptionModel.findOne.mockReturnValue({
        exec: jest.fn().mockRejectedValue(new Error('Test error')),
      });
      await expect(service.validateApiKey('validApiKey')).rejects.toThrow(InternalServerErrorException);
    });
});

describe('getApiKeys', () => {
    it('should return a list of API key subscriptions', async () => {
      const apiKeys = [mockCreateApiKeySubscriptionDto];
      apiKeySubscriptionModel.find.mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(apiKeys),
      });
  
      const result = await service.getApiKeys(10, 'premium');
      expect(result).toEqual(apiKeys);
      expect(apiKeySubscriptionModel.find).toHaveBeenCalledWith({ type: 'premium', isActive: true });
      expect(apiKeySubscriptionModel.find().limit).toHaveBeenCalledWith(10);
    });
  
    it('should throw an InternalServerErrorException if an error occurs', async () => {
      apiKeySubscriptionModel.find.mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(new Error('Test error')),
      });
      await expect(service.getApiKeys(10, 'premium')).rejects.toThrow(InternalServerErrorException);
    });
  });
  describe('ApiKeySubscriptionService', () => {
    let service: ApiKeySubscriptionService;
    let apiKeySubscriptionModel: typeof apiKeySubscriptionModelMock;
  
    beforeEach(async () => {
      apiKeySubscriptionModel = apiKeySubscriptionModelMock;
  
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
  
    describe('cancelApiKey', () => {
      it('should cancel the API key by setting isActive to false', async () => {
        apiKeySubscriptionModel.findByIdAndUpdate.mockReturnValue({
          exec: jest.fn().mockResolvedValue(true),
        });
  
        await service.cancelApiKey('someId');
        expect(apiKeySubscriptionModel.findByIdAndUpdate).toHaveBeenCalledWith('someId', { isActive: false });
      });
  
      it('should throw an InternalServerErrorException if an error occurs', async () => {
        apiKeySubscriptionModel.findByIdAndUpdate.mockReturnValue({
          exec: jest.fn().mockRejectedValue(new Error('Test error')),
        });
  
        await expect(service.cancelApiKey('someId')).rejects.toThrow(InternalServerErrorException);
      });
    });
  });
});
