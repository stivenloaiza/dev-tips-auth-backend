import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLogDto } from './dtos/createLogs.dto';
import { Log, LogDocument } from './entities/logs.entity';

@Injectable()
export class LogsService {
  constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>) {}

  async create(createLogDto: CreateLogDto): Promise<Log> {
    const createdLog = new this.logModel(createLogDto);
    return createdLog.save();
  }

  async findAll(): Promise<Log[]> {
    return this.logModel.find().exec();
  }

  async findOne(id: string): Promise<Log> {
    const log = await this.logModel.findById(id).exec();
    if (!log) {
      throw new NotFoundException(`Log #${id} not found`);
    }
    return log;
  }

  async update(id: string, updateLogDto: CreateLogDto): Promise<Log> {
    const existingLog = await this.logModel
      .findByIdAndUpdate(id, updateLogDto, { new: true })
      .exec();
    if (!existingLog) {
      throw new NotFoundException(`Log #${id} not found`);
    }
    return existingLog;
  }

  async remove(id: string): Promise<void> {
    const result = await this.logModel.findByIdAndDelete(id).exec();
    if (result === null) {
      throw new NotFoundException(`Log #${id} not found`);
    }
  }
}
