import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
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
          `User Log with username ${createUserLogsDto.username} or apiKey ${createUserLogsDto.apiKey} already exists`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const createdUserLog = new this.userLogsModel(createUserLogsDto);
      return await createdUserLog.save();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new NotFoundException('Error creating User Log');
      }
    }
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ data: UserLogs[]; total: number }> {
    try {
      const logs = await this.userLogsModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      const total = await this.userLogsModel.countDocuments().exec();

      return {
        data: logs.map((log) => log.toObject({ versionKey: false })),
        total,
      };
    } catch (error) {
      throw new BadRequestException('Error retrieving logs');
    }
  }

  async findOne(id: string): Promise<UserLogs> {
    try {
      const userLogs = await this.userLogsModel.findById(id).exec();

      if (!userLogs) {
        throw new HttpException(
          `User Log with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return userLogs.toObject({ versionKey: false }) as UserLogs;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(
    id: string,
    updateUserLogsDto: UpdateUserDto,
  ): Promise<UserLogs> {
    try {
      const updatedUserLog = await this.userLogsModel
        .findByIdAndUpdate(id, updateUserLogsDto, { new: true })
        .exec();

      if (!updatedUserLog) {
        throw new NotFoundException(
          `User Logs for user with ID '${id}' not found.`,
        );
      }

      return updatedUserLog.toObject({ versionKey: false });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const deleteUserLogs = await this.userLogsModel
        .findByIdAndDelete(id)
        .exec();
      if (!deleteUserLogs) {
        throw new HttpException(
          `User Log with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async checkRequestLimit(userId: string): Promise<void> {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async blockUser(id: string): Promise<UserLogs> {
    try {
      const user = await this.userLogsModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('User Log not found');
      }
      user.isBlocked = true;
      user.blockedAt = new Date();
      return user.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
