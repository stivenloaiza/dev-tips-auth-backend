import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { Log } from './entities/logs.entity';
import { CreateLogDto } from './dtos/createLogs.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('logs')
@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  create(@Body() createLogDto: CreateLogDto): Promise<Log> {
    return this.logsService.create(createLogDto);
  }

  @Get()
  findAll(): Promise<Log[]> {
    return this.logsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Log> {
    return this.logsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateLogDto: CreateLogDto,
  ): Promise<Log> {
    return this.logsService.update(id, updateLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.logsService.remove(id);
  }
}
