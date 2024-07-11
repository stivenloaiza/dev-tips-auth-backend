import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserLogs, UserLogsSchema } from './entities/userLogs.entities';
import { UserLogService } from './services/userLogs.service';
import { UserLogsController } from './controller/userLogs.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserLogs.name, schema: UserLogsSchema },
    ]),
  ],
  providers: [UserLogService],
  controllers: [UserLogsController],
  exports: [UserLogService],
})
export class UserLogsModule {}
