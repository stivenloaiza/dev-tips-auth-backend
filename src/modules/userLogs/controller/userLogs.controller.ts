import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserLogService } from '../services/userLogs.service';
import { CreateUserLogsDto } from '../dtos/createUserLogs.dto';
import { UserLogs } from '../entities/userLogs.entities';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../dtos/updateUserLogs.dto';
@ApiTags('User logs')
@Controller('userLogs')
export class UserLogsController {
  constructor(private readonly userLogsService: UserLogService) {}

  @Post('create')
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key needed to access this endpoint',
  })
  @ApiOperation({ summary: 'Create a new User Log' })
  @ApiResponse({
    status: 201,
    description: 'The User Log has been successfully created.',
    type: UserLogs,
  })
  async createUserLogs(
    @Body() createUserLogsDto: CreateUserLogsDto,
  ): Promise<UserLogs> {
    try {
      const createdUserLog =
        await this.userLogsService.createUserLogs(createUserLogsDto);
      return createdUserLog;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new HttpException(
          'Error creating User Log',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @Get('all')
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key needed to access this endpoint',
  })
  @ApiOperation({ summary: 'Retrieve all Users Logs' })
  @ApiResponse({
    status: 200,
    description: 'The Users Logs have been successfully retrieved.',
    type: [UserLogs],
  })
  async findAll(): Promise<UserLogs[]> {
    return this.userLogsService.findAll();
  }

  @Get(':id')
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key needed to access this endpoint',
  })
  @ApiOperation({ summary: 'Retrieve a specific User Log' })
  @ApiResponse({
    status: 200,
    description: 'The User Log has been successfully retrieved.',
    type: UserLogs,
  })
  @ApiResponse({ status: 404, description: 'User Log not found.' })
  async findOne(@Param('id') id: string): Promise<UserLogs> {
    return this.userLogsService.findOne(id);
  }

  @Patch(':id')
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key needed to access this endpoint',
  })
  @ApiOperation({ summary: 'Update a specific User Log' })
  @ApiResponse({
    status: 200,
    description: 'The User Log has been successfully updated.',
    type: UserLogs,
  })
  @ApiResponse({ status: 404, description: 'User Log not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserLogs> {
    return this.userLogsService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key needed to access this endpoint',
  })
  @ApiOperation({ summary: 'Delete a specific User Log' })
  @ApiResponse({
    status: 200,
    description: 'The User Log has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'User Log not found.' })
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userLogsService.delete(id);
  }

  @Patch(':id/block')
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key needed to access this endpoint',
  })
  @ApiOperation({ summary: 'Block a specific User Log' })
  @ApiResponse({
    status: 200,
    description: 'The User Log has been successfully blocked.',
    type: UserLogs,
  })
  @ApiResponse({ status: 404, description: 'User Log not found.' })
  async blockUser(@Param('id') id: string): Promise<UserLogs> {
    return this.userLogsService.blockUser(id);
  }
}
