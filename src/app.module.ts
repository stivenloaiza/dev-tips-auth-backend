import { Module } from '@nestjs/common';
import { PersistenceModule } from './libs/persistence/persistence.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './libs/persistence/db.config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './libs/auth/guard/api-key.guard';
import { ApiKeyModule } from './libs/auth/api-key.module';
import { ApiKeySubscriptionModule } from './libs/apiKeySubs/apikeyUser.module';
import { UserLogsModule } from './modules/userLogs/userLogs.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    ApiKeyModule,
    ApiKeySubscriptionModule,
    UserLogsModule,
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
