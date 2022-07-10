import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata"
require('dotenv').config() 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('finances');
  await app.listen(process.env.PORT);
}
bootstrap();
