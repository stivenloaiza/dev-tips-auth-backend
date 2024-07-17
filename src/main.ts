import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UnauthorizedExceptionFilter } from './libs/middleware/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Aplica el filtro de excepciones globalmente
  app.useGlobalFilters(new UnauthorizedExceptionFilter());

  const port = process.env.PORT || 3000;

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API de Microservicio')
    .setDescription('Documentación de la API de Microservicio')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
