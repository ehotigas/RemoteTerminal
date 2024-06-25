import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import {
  DocumentBuilder,
  SwaggerModule
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder().setTitle(
    'Remote Terminal'
  ).setDescription(
    'An API to remote terminal access'
  ).setVersion(
    '1.0'
  ).build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(5000);
}

bootstrap();
