import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from './entities/logs.entity'; 
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  providers: [LogsService],
  controllers: [LogsController],
})
export class LogsModule {}
