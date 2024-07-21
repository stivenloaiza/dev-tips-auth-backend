import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { Log } from './entities/logs.entity';
import { CreateLogDto } from './dtos/createLogs.dto';
import {
  ApiHeader,
  ApiTags,
  ApiQuery,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('logs')
@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post('new')
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key needed to access this endpoint',
  })
  @ApiOperation({ summary: 'Create a new log' })
  @ApiResponse({ status: 201, description: 'Log created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createLogDto: CreateLogDto): Promise<Log> {
    return this.logsService.create(createLogDto);
  }

  @Get('all')
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key needed to access this endpoint',
  })
  @ApiOperation({ summary: 'Retrieve all logs with pagination' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    example: 10,
  })
  @ApiResponse({ status: 200, description: 'Logs retrieved successfully.' })
  @ApiResponse({ status: 400, description: 'Error retrieving logs.' })
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<{ data: Log[]; total: number }> {
    return this.logsService.findAll(page, limit);
  }

  @Get(':id')
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key needed to access this endpoint',
  })
  @ApiOperation({ summary: 'Retrieve a log by ID' })
  @ApiResponse({ status: 200, description: 'Log retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Log not found.' })
  findOne(@Param('id') id: string): Promise<Log> {
    return this.logsService.findOne(id);
  }

  @Put(':id')
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key needed to access this endpoint',
  })
  @ApiOperation({ summary: 'Update a log by ID' })
  @ApiResponse({ status: 200, description: 'Log updated successfully.' })
  @ApiResponse({ status: 404, description: 'Log not found.' })
  @ApiResponse({ status: 400, description: 'Error updating log.' })
  update(
    @Param('id') id: string,
    @Body() updateLogDto: CreateLogDto,
  ): Promise<Log> {
    return this.logsService.update(id, updateLogDto);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'x-api-key',
    description: 'API key needed to access this endpoint',
  })
  @ApiOperation({ summary: 'Delete a log by ID' })
  @ApiResponse({ status: 204, description: 'Log deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Log not found.' })
  @ApiResponse({ status: 400, description: 'Error deleting log.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.logsService.remove(id);
  }
}
