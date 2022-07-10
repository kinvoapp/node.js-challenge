import { Injectable } from '@nestjs/common';
import { Expense } from '../expense/entities/expense.entity';
import { AppDataSource } from "../../shared/data-source/data-source"
import { Revenue } from '../revenue/entities/revenue.entity';
import { GetBalanceHistoryDto } from './dto/get-balance-history.dto';

@Injectable()
export class BalanceService {


  async getBalance(): Promise<number> {
    let { expenseTotal } = await AppDataSource.getRepository(Expense)
      .createQueryBuilder('expense')
      .select("SUM(expense.value)", "expenseTotal")
      .getRawOne();

    let { revenueTotal } = await AppDataSource.getRepository(Revenue)
      .createQueryBuilder('revenue')
      .select("SUM(revenue.value)", "revenueTotal")
      .getRawOne();

    return (revenueTotal ?? 0) - (expenseTotal ?? 0);
  }

  async getHistory(model: GetBalanceHistoryDto, page: number) {
    if (page !== 0) page = page * 2;

    

  }

}
