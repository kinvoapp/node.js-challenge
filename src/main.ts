import { NestFactory } from '@nestjs/core';
import { CarteiraModule } from './modules/carteira.module';

async function bootstrap() {
  const app = await NestFactory.create(CarteiraModule);
  await app.listen(3000);
}
bootstrap();
