import { Module } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { BalanceController } from './balance.controller';

@Module({
  controllers: [BalanceController],
  providers: [BalanceService]
})
export class BalanceModule {}
