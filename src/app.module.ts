import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersistenceModule } from './libs/persistence/persistence.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './libs/persistence/db.config';
import { UserLogsModule } from './modules/userLogs/userLogs.module';
import { ApiKeyModule } from './libs/auth/api-key.module';
import { ApiKeySubscriptionModule } from './libs/apiKeySubs/apikeyUser.module';
import { LogsModule } from './modules/logs/logs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    ApiKeyModule,
    UserLogsModule,
    ApiKeySubscriptionModule,
    LogsModule,
    PersistenceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
