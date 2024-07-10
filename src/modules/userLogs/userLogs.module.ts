import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserLogs, UserLogsSchema } from './entities/userLogs.entities';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserLogs.name, schema: UserLogsSchema },
    ]),
  ],
  providers: [],
  controllers: [],
})
export class LogsModule {}
