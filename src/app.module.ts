import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersistenceModule } from './libs/persistence/persistence.module';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import dbConfig from './libs/persistence/db.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [dbConfig],
      isGlobal: true,
    }),
    PersistenceModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
