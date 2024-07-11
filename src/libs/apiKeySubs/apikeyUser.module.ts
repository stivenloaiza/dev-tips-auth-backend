import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiKeySubscriptionController } from './controller/apikey.controller';
import {
  ApiKeySubscription,
  ApiKeySubscriptionSchema,
} from './entities/apiKeySubs.entity';
import { ApiKeySubscriptionService } from './service/apiKeySubs.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ApiKeySubscription.name, schema: ApiKeySubscriptionSchema },
    ]),
  ],
  controllers: [ApiKeySubscriptionController],
  providers: [ApiKeySubscriptionService],
})
export class ApiKeySubscriptionModule {}
