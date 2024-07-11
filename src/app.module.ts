import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersistenceModule } from './libs/persistence/persistence.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './libs/persistence/db.config';
import { UserLogsModule } from './modules/userLogs/userLogs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistenceModule,
    UserLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
