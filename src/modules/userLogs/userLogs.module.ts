import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserLogs, UserLogsSchema } from './entities/userLogs.entities';
import { UserLogService } from './userLogs/userLogs.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserLogs.name, schema: UserLogsSchema },
    ]),
  ],
  providers: [UserLogService],
  controllers: [],
})
export class UserLogsModule {}
