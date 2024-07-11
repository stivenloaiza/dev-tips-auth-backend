import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiKey, ApiKeySchema } from './entities/api-key.entity';
import { AuthService } from './service/api-key.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ApiKey.name, schema: ApiKeySchema }]),
  ],
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
})
export class ApiKeyModule {}
