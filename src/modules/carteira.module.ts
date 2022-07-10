import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { InicialService } from './inicial.service';
import { InicialController } from './inicial.controller';
import { MovimentacaoController } from './movimentacao.controller';
import { MovimentacaoService } from './movimentacao.service';
import { FinalController } from './final.controller';
import { FinalService } from './final.service';
import { SaldoController } from './saldo.controller';
import { SaldoService } from './saldo.service';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [CacheModule.register({ttl: 30, isGlobal: true})],
  controllers: [MovimentacaoController, InicialController, FinalController, SaldoController],
  providers: [PrismaService, MovimentacaoService, InicialService, FinalService, SaldoService,
    {provide: APP_INTERCEPTOR, useClass: CacheInterceptor}],
})
export class CarteiraModule {}
