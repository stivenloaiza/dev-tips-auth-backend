import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './api-key.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ApiKey, ApiKeyDocument } from '../entities/api-key.entity';
import { UpdateApiKeyDto } from '../dtos/updateApiKey.dto';
import { InternalServerErrorException } from '@nestjs/common';

// Mock de la clase ApiKeyModel
const mockApiKeyModel = () => ({
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findOneAndUpdate: jest.fn(),
  find: jest.fn(),
});

// Mock del documento ApiKey
const mockApiKey: ApiKeyDocument = {
  _id: '1' as any,
  key: 'hashed_key',
  isActive: true,
  usageCount: 0,
  maxUsage: 10,
  lastUsedAt: new Date(),
  save: jest.fn().mockResolvedValue(this),
} as unknown as ApiKeyDocument;

describe('AuthService', () => {
  let service: AuthService;
  let apiKeyModel: Model<ApiKeyDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getModelToken(ApiKey.name), useValue: mockApiKeyModel() },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    apiKeyModel = module.get<Model<ApiKeyDocument>>(getModelToken(ApiKey.name));
  });

  const mockUpdateApiKeyDto: UpdateApiKeyDto = {
    /* tus propiedades DTO */
  };

  beforeEach(() => {
    jest.spyOn(bcrypt, 'compare').mockImplementation(async (key: string) => {
      return key === 'valid_key' ? true : false;
    });
  });

  describe('createApiKey', () => {
    it('should create and return an API key', async () => {
      apiKeyModel.create = jest.fn().mockResolvedValue(mockApiKey);
      jest
        .spyOn(service as any, 'generateApiKey')
        .mockResolvedValue('generated_key');
    });
  });

  describe('getApiKey', () => {
    it('should return an API key by ID', async () => {
      apiKeyModel.findById = jest.fn().mockResolvedValue(mockApiKey);
      const result = await service.getApiKey('1');
      expect(result).toEqual(mockApiKey);
    });

    describe('updateApiKey', () => {
      it('should update and return an API key', async () => {
        apiKeyModel.findByIdAndUpdate = jest.fn().mockResolvedValue(mockApiKey);
        const result = await service.updateApiKey('1', mockUpdateApiKeyDto);
        expect(result).toEqual(mockApiKey);
      });
    });

    describe('revokeApiKey', () => {
      it('should revoke an API key', async () => {
        apiKeyModel.findById = jest.fn().mockResolvedValue(mockApiKey);
        const saveMock = jest
          .spyOn(mockApiKey, 'save')
          .mockResolvedValue(mockApiKey);
        await service.revokeApiKey('1');
        expect(saveMock).toHaveBeenCalled();
      });

      describe('validateApiKey', () => {
        it('should return true if API key is valid', async () => {
          apiKeyModel.find = jest.fn().mockResolvedValue([mockApiKey]);
          const result = await service.validateApiKey('valid_key');
          expect(result).toBe(true);
        });

        it('should return false if API key is not valid', async () => {
          apiKeyModel.find = jest.fn().mockResolvedValue([mockApiKey]);
          const result = await service.validateApiKey('invalid_key');
          expect(result).toBe(false);
        });

        it('should throw an InternalServerErrorException if an error occurs', async () => {
          apiKeyModel.find = jest.fn().mockRejectedValue(new Error('Error'));
          await expect(service.validateApiKey('key')).rejects.toThrow(
            InternalServerErrorException,
          );
        });
      });
    });
  });
});
