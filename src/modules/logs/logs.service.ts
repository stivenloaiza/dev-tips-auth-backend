import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLogDto } from './dtos/createLogs.dto';
import { Log, LogDocument } from './entities/logs.entity';

@Injectable()
export class LogsService {
  constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>) {}

  async create(createLogDto: CreateLogDto): Promise<Log> {
    try {
      const createdLog = new this.logModel(createLogDto);
      return await createdLog.save();
    } catch (error) {
      throw new BadRequestException('Error creating log');
    }
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ data: Log[]; total: number }> {
    try {
      const logs = await this.logModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      const total = await this.logModel.countDocuments().exec();
      return { data: logs, total };
    } catch (error) {
      throw new BadRequestException('Error retrieving logs');
    }
  }

  async findOne(id: string): Promise<Log> {
    try {
      const log = await this.logModel.findById(id).exec();
      if (!log) {
        throw new NotFoundException(`Log #${id} not found`);
      }
      return log;
    } catch (error) {
      throw new NotFoundException(`Log #${id} not found`);
    }
  }

  async update(id: string, updateLogDto: CreateLogDto): Promise<Log> {
    try {
      const existingLog = await this.logModel
        .findByIdAndUpdate(id, updateLogDto, { new: true })
        .exec();
      if (!existingLog) {
        throw new NotFoundException(`Log #${id} not found`);
      }
      return existingLog;
    } catch (error) {
      throw new BadRequestException('Error updating log');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.logModel.findByIdAndDelete(id).exec();
      if (result === null) {
        throw new NotFoundException(`Log #${id} not found`);
      }
    } catch (error) {
      throw new BadRequestException('Error deleting log');
    }
  }
}
