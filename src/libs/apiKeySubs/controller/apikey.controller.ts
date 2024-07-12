import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiKeySubscriptionService } from '../service/apiKeySubs.service';
import { CreateApiKeySubscriptionDto } from '../dtos/create-apy-key-subs.dto';
import { ApiKeySubscription } from '../entities/apiKeySubs.entity';
import { UpdateApiKeySubscriptionDto } from '../dtos/update-apy-key-subs.dto';

@ApiTags('api-key-subscriptions')
@Controller('key-subscriptions')
export class ApiKeySubscriptionController {
  constructor(
    private readonly apiKeySubscriptionService: ApiKeySubscriptionService,
  ) {}

  @Post('new')
  @ApiOperation({ summary: 'Create a new API key subscription' })
  @ApiResponse({
    status: 201,
    description: 'The API key subscription has been successfully created.',
  })
  async create(
    @Body() createApiKeySubscriptionDto: CreateApiKeySubscriptionDto,
  ): Promise<ApiKeySubscription> {
    return this.apiKeySubscriptionService.createApiKeySubscription(
      createApiKeySubscriptionDto,
    );
  }

  @Post('validate')
  async validateApiKey(@Body('apiKey') apiKey: string) {
    return this.apiKeySubscriptionService.validateApiKey(apiKey);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all API key subscriptions' })
  @ApiResponse({
    status: 200,
    description: 'Return all API key subscriptions.',
  })
  async findAll(): Promise<ApiKeySubscription[]> {
    return this.apiKeySubscriptionService.findAll();
  }

  @Get(':apiKey')
  @ApiOperation({ summary: 'Get an API key subscription by API key' })
  @ApiResponse({ status: 200, description: 'Return the API key subscription.' })
  @ApiResponse({ status: 404, description: 'API key subscription not found.' })
  async findOne(@Param('apiKey') apiKey: string): Promise<ApiKeySubscription> {
    const subscription = await this.apiKeySubscriptionService.findOne(apiKey);
    if (!subscription) {
      throw new NotFoundException('API key subscription not found');
    }
    return subscription;
  }

  @Put(':apiKey')
  @ApiOperation({ summary: 'Update an API key subscription by API key' })
  @ApiResponse({
    status: 200,
    description: 'The API key subscription has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'API key subscription not found.' })
  async update(
    @Param('apiKey') apiKey: string,
    @Body() updateApiKeySubscriptionDto: UpdateApiKeySubscriptionDto,
  ): Promise<ApiKeySubscription> {
    const subscription =
      await this.apiKeySubscriptionService.updateApiKeySubscription(
        apiKey,
        updateApiKeySubscriptionDto,
      );
    if (!subscription) {
      throw new NotFoundException('API key subscription not found');
    }
    return subscription;
  }

  @Delete(':apiKey')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an API key subscription by API key' })
  @ApiResponse({
    status: 204,
    description: 'The API key subscription has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'API key subscription not found.' })
  async remove(@Param('apiKey') apiKey: string): Promise<void> {
    const subscription =
      await this.apiKeySubscriptionService.deleteApiKeySubscription(apiKey);
    if (!subscription) {
      throw new NotFoundException('API key subscription not found');
    }
  }
}
