import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserLogsDto } from '../dtos/createUserLogs.dto';
import { UserLogs, UserLogsDocument } from '../entities/userLogs.entities';
import { UpdateUserDto } from '../dtos/updateUserLogs.dto';

@Injectable()
export class UserLogService {
  private readonly requestLimit = 100;

  constructor(
    @InjectModel(UserLogs.name) private userLogsModel: Model<UserLogsDocument>,
  ) {}

  async createUserLogs(
    createUserLogsDto: CreateUserLogsDto,
  ): Promise<UserLogs> {
    try {
      const existingUserLogs = await this.userLogsModel
        .findOne({
          $or: [
            { username: createUserLogsDto.username },
            { apiKey: createUserLogsDto.apiKey },
          ],
        })
        .exec();
      if (existingUserLogs) {
        throw new HttpException(
          `User log with username ${createUserLogsDto.username} or apiKey ${createUserLogsDto.apiKey} already exists`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const createdUserLog = new this.userLogsModel(createUserLogsDto);
      return await createdUserLog.save();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new NotFoundException('Error creating user log');
      }
    }
  }

  async findAll(): Promise<UserLogs[]> {
    const logs = await this.userLogsModel.find().exec();
    return logs.map((log) => log.toObject({ versionKey: false }));
  }

  async findOne(id: string): Promise<UserLogs> {
    const userLogs = await this.userLogsModel.findById(id).exec();

    if (!userLogs) {
      throw new HttpException(
        `UserLog with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return userLogs.toObject({ versionKey: false }) as UserLogs;
  }

  async update(
    id: string,
    updateUserLogsDto: UpdateUserDto,
  ): Promise<UserLogs> {
    const updatedUserLog = await this.userLogsModel
      .findByIdAndUpdate(id, updateUserLogsDto, { new: true })
      .exec();

    if (!updatedUserLog) {
      throw new NotFoundException(
        `UserLogs for user with ID '${id}' not found.`,
      );
    }

    return updatedUserLog.toObject({ versionKey: false });
  }

  async remove(id: string): Promise<void> {
    const deleteUserLogs = await this.userLogsModel
      .findByIdAndDelete(id)
      .exec();
    if (!deleteUserLogs) {
      throw new HttpException(
        `UserLogs with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async checkRequestLimit(userId: string): Promise<void> {
    const user = await this.userLogsModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.requestCount += 1;
    if (user.requestCount > this.requestLimit) {
      user.isBlocked = true;
      user.blockedAt = new Date();
    }
    await user.save();
  }

  async blockUser(id: string): Promise<UserLogs> {
    const user = await this.userLogsModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.isBlocked = true;
    user.blockedAt = new Date();
    return user.save();
  }
}
