import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseModule } from './modules/expense/expense.module';
import { RevenueModule } from './modules/revenue/revenue.module';
import * as ormconfig from '../ormconfig.js';
import { BalanceModule } from './modules/balance/balance.module';



@Module({
  imports: [
    ExpenseModule,
    RevenueModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig),
    BalanceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
