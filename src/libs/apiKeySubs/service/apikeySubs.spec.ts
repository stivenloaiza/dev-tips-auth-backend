
import { ApiKeySubscriptionService } from './apikeySubs.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ApiKeySubscription } from '../entities/apiKeySubs.entity';


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
});