import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiKeySubscriptionService } from '../service/apiKeySubs.service';
import { CreateApiKeySubscriptionDto } from '../dtos/create-apy-key-subs.dto';

@Controller('key-subscription')
export class ApiKeySubscriptionController {
  constructor(
    private readonly apiKeySubscriptionService: ApiKeySubscriptionService,
  ) {}

  @Post('new')
  async create(
    @Body() createApiKeySubscriptionDto: CreateApiKeySubscriptionDto,
  ) {
    try {
      return await this.apiKeySubscriptionService.create(
        createApiKeySubscriptionDto,
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('validate')
  async validateApiKey(@Body('apiKey') apiKey: string) {
    try {
      return await this.apiKeySubscriptionService.validateApiKey(apiKey);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('cancel')
  async cancelApiKey(@Body('_id') id: string) {
    try {
      return await this.apiKeySubscriptionService.cancelApiKey(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('keys')
  async getApiKeys(
    @Query('limit') limit: number,
    @Query('typeSubscription') type: string,
  ) {
    try {
      return await this.apiKeySubscriptionService.getApiKeys(limit, type);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
