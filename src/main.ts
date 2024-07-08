import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UnauthorizedExceptionFilter } from './libs/middleware/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Aplica el filtro de excepciones globalmente
  app.useGlobalFilters(new UnauthorizedExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Authentication API')
    .setDescription('Authentication API')
    .setVersion('1.0')
    .addTag('authentication', 'users')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
