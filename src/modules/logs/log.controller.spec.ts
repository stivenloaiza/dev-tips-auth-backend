import { Test, TestingModule } from '@nestjs/testing';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { CreateLogDto } from './dtos/createLogs.dto';

import {
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

const mockLog = {
  ip: '127.0.0.1',
  userId: 'userId',
  endpoint: '/api/test',
  system_name: 'system_name',
  method: 'GET',
  requestBody: {},
  responseBody: {},
  statusCode: 200,
  timestamp: new Date(),
};

const mockLogsService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('LogsController', () => {
  let controller: LogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogsController],
      providers: [
        {
          provide: LogsService,
          useValue: mockLogsService,
        },
      ],
    }).compile();

    controller = module.get<LogsController>(LogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new log', async () => {
      const createLogDto: CreateLogDto = mockLog;
      const result = { id: '1', ...createLogDto };

      mockLogsService.create.mockResolvedValue(result);

      expect(await controller.create(createLogDto)).toEqual(result);
    });

    it('should throw a BadRequestException on error', async () => {
      const createLogDto: CreateLogDto = mockLog;

      mockLogsService.create.mockRejectedValue(
        new BadRequestException('Error creating log'),
      );

      await expect(controller.create(createLogDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of logs', async () => {
      const page = 1;
      const limit = 10;
      const result = { data: [mockLog], total: 1 };

      mockLogsService.findAll.mockResolvedValue(result);

      expect(await controller.findAll(page, limit)).toEqual(result);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      const page = 1;
      const limit = 10;

      mockLogsService.findAll.mockRejectedValue(
        new InternalServerErrorException('Error retrieving logs'),
      );

      await expect(controller.findAll(page, limit)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findOne', () => {
    it('should return a single log', async () => {
      const id = '1';
      mockLogsService.findOne.mockResolvedValue(mockLog);

      expect(await controller.findOne(id)).toEqual(mockLog);
    });

    it('should throw a NotFoundException if log is not found', async () => {
      const id = '1';
      mockLogsService.findOne.mockRejectedValue(
        new NotFoundException('Log #1 not found'),
      );

      await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the log', async () => {
      const id = '1';
      const updateLogDto: CreateLogDto = mockLog;
      const result = { id, ...updateLogDto };

      mockLogsService.update.mockResolvedValue(result);

      expect(await controller.update(id, updateLogDto)).toEqual(result);
    });

    it('should throw a NotFoundException if log is not found', async () => {
      const id = '1';
      const updateLogDto: CreateLogDto = mockLog;

      mockLogsService.update.mockRejectedValue(
        new NotFoundException('Log #1 not found'),
      );

      await expect(controller.update(id, updateLogDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an InternalServerErrorException on error', async () => {
      const id = '1';
      const updateLogDto: CreateLogDto = mockLog;

      mockLogsService.update.mockRejectedValue(
        new InternalServerErrorException('Error updating log'),
      );

      await expect(controller.update(id, updateLogDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('remove', () => {
    it('should delete the log', async () => {
      const id = '1';
      mockLogsService.remove.mockResolvedValue(undefined);

      expect(await controller.remove(id)).toBeUndefined();
    });

    it('should throw a NotFoundException if log is not found', async () => {
      const id = '1';
      mockLogsService.remove.mockRejectedValue(
        new NotFoundException('Log #1 not found'),
      );

      await expect(controller.remove(id)).rejects.toThrow(NotFoundException);
    });

    it('should throw an InternalServerErrorException on error', async () => {
      const id = '1';
      mockLogsService.remove.mockRejectedValue(
        new InternalServerErrorException('Error deleting log'),
      );

      await expect(controller.remove(id)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
