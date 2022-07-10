import { CacheModule, Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense]),
    CacheModule.register(
      {
        ttl: 20,
        max: 100
      }
    )
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService]
})
export class ExpenseModule { }
