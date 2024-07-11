import { Module } from '@nestjs/common';
import { PersistenceModule } from './libs/persistence/persistence.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './libs/persistence/db.config';
import { UserLogsModule } from './modules/userLogs/userLogs.module';
import { ApiKeyModule } from './libs/auth/api-key.module';
import { ApiKeySubscriptionModule } from './libs/apiKeySubs/apikeyUser.module';
import { LogsModule } from './modules/logs/logs.module';
import { AuthGuard } from './libs/auth/guard/api-key.guard';
import { APP_GUARD } from '@nestjs/core';

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
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
