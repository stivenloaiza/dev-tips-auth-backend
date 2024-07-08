import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnauthorizedExceptionFilter } from './libs/middleware/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Aplica el filtro de excepciones globalmente
  app.useGlobalFilters(new UnauthorizedExceptionFilter());

  await app.listen(3000);
}
bootstrap();
