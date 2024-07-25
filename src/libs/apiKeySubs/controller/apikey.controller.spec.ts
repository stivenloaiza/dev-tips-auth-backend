import { Test, TestingModule } from '@nestjs/testing';

import { ApiKeySubscriptionController } from './apikey.controller';
import { CreateApiKeySubscriptionDto } from '../dtos/create-apy-key-subs.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { ApiKeySubscription } from '../entities/apiKeySubs.entity';
import { ApiKeySubscriptionService } from '../service/apiKeySubs.service';

describe('ApiKeySubscriptionController', () => {
  let controller: ApiKeySubscriptionController;
  let service: ApiKeySubscriptionService;

  const mockApiKeySubscription: ApiKeySubscription = {
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

  const mockCreateApiKeySubscriptionDto: CreateApiKeySubscriptionDto = {
    type: 'premium',
    limit: 50,
  };

  const apiKeySubscriptionServiceMock = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiKeySubscriptionController],
      providers: [
        {
          provide: ApiKeySubscriptionService,
          useValue: apiKeySubscriptionServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ApiKeySubscriptionController>(
      ApiKeySubscriptionController,
    );
    service = module.get<ApiKeySubscriptionService>(ApiKeySubscriptionService);
  });

  describe('create', () => {
    it('should create and return a new API key subscription', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockApiKeySubscription);

      const result = await controller.create(mockCreateApiKeySubscriptionDto);

      expect(result).toEqual(mockApiKeySubscription);
      expect(service.create).toHaveBeenCalledWith(
        mockCreateApiKeySubscriptionDto,
      );
    });

    it('should throw an InternalServerErrorException if an error occurs', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(new Error('Test error'));

      await expect(
        controller.create(mockCreateApiKeySubscriptionDto),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('validateApiKey', () => {
    it('should validate the API key and return the result', async () => {
      const apiKey = 'validApiKey123';
      const validationResult = true;
      service.validateApiKey = jest.fn().mockResolvedValue(validationResult); // Asegurarse de que el método exista

      const result = await controller.validateApiKey(apiKey);

      expect(result).toEqual(validationResult);
      expect(service.validateApiKey).toHaveBeenCalledWith(apiKey);
    });

    it('should throw an InternalServerErrorException if an error occurs', async () => {
      const apiKey = 'invalidApiKey123';
      service.validateApiKey = jest
        .fn()
        .mockRejectedValue(new Error('Test error')); // Asegurarse de que el método exista

      await expect(controller.validateApiKey(apiKey)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('cancelApiKey', () => {
    it('should cancel the API key subscription and return the result', async () => {
      const id = 'validSubscriptionId';
      const cancelResult = {
        message: 'API key subscription canceled successfully.',
      };
      service.cancelApiKey = jest.fn().mockResolvedValue(cancelResult);

      const result = await controller.cancelApiKey(id);

      expect(result).toEqual(cancelResult);
      expect(service.cancelApiKey).toHaveBeenCalledWith(id);
    });

    it('should throw an InternalServerErrorException if an error occurs', async () => {
      const id = 'invalidSubscriptionId';
      service.cancelApiKey = jest
        .fn()
        .mockRejectedValue(new Error('Test error'));

      await expect(controller.cancelApiKey(id)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getApiKeys', () => {
    it('should retrieve API keys by type and limit', async () => {
      const limit = 10;
      const type = 'premium';
      const apiKeys: ApiKeySubscription[] = [
        {
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
        },
      ];

      service.getApiKeys = jest.fn().mockResolvedValue(apiKeys);

      const result = await controller.getApiKeys(limit, type);

      expect(result).toEqual(apiKeys);
      expect(service.getApiKeys).toHaveBeenCalledWith(limit, type);
    });

    it('should throw an InternalServerErrorException if an error occurs', async () => {
      const limit = 10;
      const type = 'premium';
      service.getApiKeys = jest.fn().mockRejectedValue(new Error('Test error'));

      await expect(controller.getApiKeys(limit, type)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
