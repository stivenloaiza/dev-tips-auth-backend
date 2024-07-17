import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { ApiKeySubscriptionService } from '../service/apiKeySubs.service';
import { CreateApiKeySubscriptionDto } from '../dtos/create-apy-key-subs.dto';

@ApiTags('Key Subscriptions')
@Controller('key-subscription')
export class ApiKeySubscriptionController {
  constructor(
    private readonly apiKeySubscriptionService: ApiKeySubscriptionService,
  ) {}

  @Post('new')
  @ApiOperation({ summary: 'Create a new API key subscription' })
  @ApiBody({ type: CreateApiKeySubscriptionDto })
  @ApiResponse({
    status: 201,
    description: 'The API key subscription has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Invalid data provided.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
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
  @ApiOperation({ summary: 'Validate an API key' })
  @ApiResponse({ status: 200, description: 'Validation successful.' })
  @ApiBadRequestResponse({ description: 'Invalid API key provided.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  async validateApiKey(@Body('apiKey') apiKey: string) {
    try {
      return await this.apiKeySubscriptionService.validateApiKey(apiKey);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('cancel')
  @ApiOperation({ summary: 'Cancel an API key subscription' })
  @ApiResponse({
    status: 200,
    description: 'API key subscription canceled successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid subscription ID provided.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  async cancelApiKey(@Body('_id') id: string) {
    try {
      return await this.apiKeySubscriptionService.cancelApiKey(id);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('keys')
  @ApiOperation({ summary: 'Get API keys by type and limit' })
  @ApiQuery({ name: 'limit', type: Number, required: true })
  @ApiQuery({ name: 'typeSubscription', type: String, required: true })
  @ApiResponse({ status: 200, description: 'API keys retrieved successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid query parameters provided.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
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
