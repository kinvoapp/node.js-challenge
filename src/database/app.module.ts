import { Module } from '@nestjs/common';
import { CarteiraModule } from '../modules/carteira.module';

@Module({
  imports: [CarteiraModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
