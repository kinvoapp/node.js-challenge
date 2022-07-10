import { Body, Controller, Get, HttpException, Query } from '@nestjs/common';
import { BalanceService } from './balance.service';
import { GetBalanceHistoryDto } from './dto/get-balance-history.dto';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) { }

  @Get()
  async balance(): Promise<number> {
    try {
      return await this.balanceService.getBalance();
    } catch (error) {
      throw new HttpException('Error get balance', 500);
    }
  }

  @Get('/history?')
  async history(@Body() model: GetBalanceHistoryDto, @Query('page') page: number) {
    try {
      return await this.balanceService.getHistory(model, +page);
    } catch (error) {
      throw new HttpException('Error get balance', 500);
    }
  }

}
