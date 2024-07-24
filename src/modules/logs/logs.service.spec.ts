import { LogsService } from './logs.service';
import { Log } from './entities/logs.entity';
import { BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateLogDto } from './dtos/createLogs.dto';

const mockLog = (id: string) => ({
  _id: id,
  ip: '127.0.0.1',
  userId: 'user123',
  endpoint: '/api/test',
  system_name: 'TestSystem',
  method: 'GET',
  requestBody: {},
  responseBody: {},
  statusCode: 200,
  timestamp: new Date(),
  createdAt: new Date(),
  createBy: 'creator',
  updatedAt: new Date(),
  updateBy: 'updater',
  deletedAt: null,
  deleteBy: null,
});

const mockLogModel = {
  create: jest.fn().mockImplementation(dto => ({
    ...dto,
    save: jest.fn().mockResolvedValue(dto),
  })),
  find: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue([mockLog('1'), mockLog('2')]),
  countDocuments: jest.fn().mockResolvedValue(2),
  findById: jest.fn().mockReturnThis(),
  findByIdAndUpdate: jest.fn().mockReturnThis(),
  findByIdAndDelete: jest.fn().mockReturnThis(),
};

describe('LogsService', () => {
  let service: LogsService;
  let model: typeof mockLogModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogsService,
        {
          provide: getModelToken(Log.name),
          useValue: mockLogModel,
        },
      ],
    }).compile();

    service = module.get<LogsService>(LogsService);
    model = module.get(getModelToken(Log.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

    describe('create', () => {
    it('should create a new log', async () => {
      const createLogDto: CreateLogDto = {
        ip: '127.0.0.1',
        userId: 'user123',
        endpoint: '/api/test',
        system_name: 'TestSystem',
        method: 'GET',
        requestBody: {},
        responseBody: {},
        statusCode: 200,
        timestamp: new Date(),
      };
      const result = await service.create(createLogDto);
      expect(result).toEqual(createLogDto);
      expect(model.create).toHaveBeenCalledWith(createLogDto);
    });

        it('should throw an error if log creation fails', async () => {
      model.create.mockImplementationOnce(() => {
        throw new Error('Error');
      });
      await expect(service.create({
        ip: '127.0.0.1',
        userId: 'user123',
        endpoint: '/api/test',
        system_name: 'TestSystem',
        method: 'GET',
        requestBody: {},
        responseBody: {},
        statusCode: 200,
        timestamp: new Date(),
      })).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return a list of logs', async () => {
      model.find().exec = jest.fn().mockResolvedValue([mockLog('1'), mockLog('2')]);
      const result = await service.findAll(1, 2);
      expect(result).toEqual({ data: [mockLog('1'), mockLog('2')], total: 2 });
      expect(model.find).toHaveBeenCalled();
    });

    it('should throw an error if logs retrieval fails', async () => {
      model.find().exec = jest.fn().mockImplementationOnce(() => {
        throw new Error('Error');
      });
      await expect(service.findAll()).rejects.toThrow(InternalServerErrorException);
    });
  });  