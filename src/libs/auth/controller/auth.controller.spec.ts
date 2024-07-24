import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../service/api-key.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateApiKeyDto } from '../dtos/createApiKey.dto';
import { UpdateApiKeyDto } from '../dtos/updateApiKey.dto';
import { validateKeyDto } from '../dtos/validate.dto';
import { ApiKey } from '../entities/api-key.entity';

const mockApiKeyService = {
  createApiKey: jest.fn(),
  validateApiKey: jest.fn(),
  findAll: jest.fn(),
  getApiKey: jest.fn(),
  updateApiKey: jest.fn(),
  revokeApiKey: jest.fn(),
};

describe('AuthController', () => {
  let authController: AuthController;
  let apiKeyService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockApiKeyService,
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    apiKeyService = module.get<AuthService>(AuthService);
  });

  describe('create', () => {
    it('should create a new API key', async () => {
      const createApiKeyDto: CreateApiKeyDto = { system_name: "auth", key: "123" };
      const result = { id: '1', ...createApiKeyDto };

      mockApiKeyService.createApiKey.mockResolvedValue(result);

      expect(await authController.create(createApiKeyDto)).toEqual(result);
    });

    it('should throw an exception when API key creation fails', async () => {
      const createApiKeyDto: CreateApiKeyDto = { system_name: "auth", key: "123" };

      mockApiKeyService.createApiKey.mockRejectedValue(new Error('Error'));

      await expect(authController.create(createApiKeyDto)).rejects.toThrowError('Error');
    });
  });

  describe('validateApiKey', () => {
    it('should validate an API key', async () => {
      const key = 'test-key';
      const result = { valid: true };

      mockApiKeyService.validateApiKey.mockResolvedValue(result);

      expect(await authController.validateApiKey(key)).toEqual(result);
    });

    it('should throw an exception when API key validation fails', async () => {
      const key = 'test-key';

      mockApiKeyService.validateApiKey.mockRejectedValue(new Error('Invalid key'));

      await expect(authController.validateApiKey(key)).rejects.toThrowError('Invalid key');
    });
  });

  describe('getAll', () => {
    it('should return all API keys', async () => {
      const page = 1;
      const limit = 10;
     const result: ApiKey[] = [
  {
    system_name: 'auth',
    key: 'test-key',
    description: 'askdhask',
    lastUsedAt: null,
    maxUsage: 100000,
    usageCount: 0,
    allowedIps: [],
    permissions: ['read'],
    expiration: new Date(),
    isActive: true,
    createdAt: new Date(),
    createBy: 'creator-id',
    updatedAt: new Date(),
    updateBy: 'updater-id',
    deletedAt: null,
    deleteBy: 'deleter-id'
  }
];

      mockApiKeyService.findAll.mockResolvedValue(result);

      expect(await authController.getAll(page, limit)).toEqual(result);
    });

    it('should throw an exception when fetching API keys fails', async () => {
      const page = 1;
      const limit = 10;

      mockApiKeyService.findAll.mockRejectedValue(new Error('Error'));

      await expect(authController.getAll(page, limit)).rejects.toThrowError('Error');
    });
  });

  describe('findOne', () => {
    it('should return an API key by ID', async () => {
      const id = '1';
      const result: ApiKey[] = [
  {
    system_name: 'auth',
    key: 'test-key',
    description: 'askdhask',
    lastUsedAt: null,
    maxUsage: 100000,
    usageCount: 0,
    allowedIps: [],
    permissions: ['read'],
    expiration: new Date(),
    isActive: true,
    createdAt: new Date(),
    createBy: 'creator-id',
    updatedAt: new Date(),
    updateBy: 'updater-id',
    deletedAt: null,
    deleteBy: 'deleter-id'
  }
];


      mockApiKeyService.getApiKey.mockResolvedValue(result);

      expect(await authController.findOne(id)).toEqual(result);
    });

    it('should throw an exception when API key not found', async () => {
      const id = '1';

      mockApiKeyService.getApiKey.mockRejectedValue(new Error('Not Found'));

      await expect(authController.findOne(id)).rejects.toThrowError('Not Found');
    });
  });

  describe('update', () => {
    it('should update an API key by ID', async () => {
      const id = '1';
      const updateApiKeyDto: UpdateApiKeyDto = { /* data */ };
      const result = { id, ...updateApiKeyDto };

      mockApiKeyService.updateApiKey.mockResolvedValue(result);

      expect(await authController.update(id, updateApiKeyDto)).toEqual(result);
    });

    it('should throw an exception when updating API key fails', async () => {
      const id = '1';
      const updateApiKeyDto: UpdateApiKeyDto = { /* data */ };

      mockApiKeyService.updateApiKey.mockRejectedValue(new Error('Error'));

      await expect(authController.update(id, updateApiKeyDto)).rejects.toThrowError('Error');
    });
  });

  describe('remove', () => {
    it('should revoke an API key by ID', async () => {
      const id = '1';

      mockApiKeyService.revokeApiKey.mockResolvedValue(undefined);

      expect(await authController.remove(id)).toEqual({ message: 'API key revoked successfully' });
    });

    it('should throw an exception when revoking API key fails', async () => {
      const id = '1';

      mockApiKeyService.revokeApiKey.mockRejectedValue(new Error('Error'));

      await expect(authController.remove(id)).rejects.toThrowError('Error');
    });
  });
});
