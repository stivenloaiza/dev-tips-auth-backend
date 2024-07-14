import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  Query,
} from '@nestjs/common';
import { CreateApiKeyDto } from '../dtos/createApiKey.dto';
import { UpdateApiKeyDto } from '../dtos/updateApiKey.dto';
import { AuthService } from '../service/api-key.service';
import { ApiKey } from '../entities/api-key.entity';

@Controller('api-keys')
export class AuthController {
  constructor(private readonly apiKeyService: AuthService) {}

  @Post('new')
  async create(@Body() createApiKeyDto: CreateApiKeyDto) {
    try {
      return await this.apiKeyService.createApiKey(createApiKeyDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('validate')
  async validateApiKey(@Body('key') key: string) {
    try {
      return await this.apiKeyService.validateApiKey(key);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.FORBIDDEN,
      );
    }
  }

  @Get('all')
  async getdAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<ApiKey[]> {
    try {
      return await this.apiKeyService.findAll(page, limit);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('_id') id: string) {
    try {
      return await this.apiKeyService.getApiKey(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('_id') id: string,
    @Body() updateApiKeyDto: UpdateApiKeyDto,
  ) {
    try {
      return await this.apiKeyService.updateApiKey(id, updateApiKeyDto);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('_id') id: string) {
    try {
      await this.apiKeyService.revokeApiKey(id);
      return { message: 'API key revoked successfully' };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
