import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Result } from 'src/shared/utils/result';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetAllExpensesDto } from './dto/get-all-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>
  ) { }

  async create(accountId: string, createExpenseDto: CreateExpenseDto): Promise<Result> {
    createExpenseDto['user'] = accountId;
    createExpenseDto.value = -createExpenseDto.value;
    await this.expenseRepository.save(createExpenseDto);
    return new Result(true, [], [{ message: 'Expense added!' }], 201);
  }

  async getAll(accountId: string, model: GetAllExpensesDto, page: number): Promise<Result> {
    if (page !== 0) page = page * 2;

    let queryBuilder = await this.expenseRepository.createQueryBuilder('expense')
      .skip(page)
      .take(2)
      .where('expense.user = :user', { user: accountId })
      .orderBy('expense.createdAt', 'DESC');

    let startDate: Date;
    let finalDate: Date;

    if (model.startDate) {
      startDate = new Date(model.startDate);
      queryBuilder.andWhere('expense.createdAt >= :startDate', { startDate: startDate });
    }

    if (model.finalDate) {
      finalDate = new Date(model.finalDate);
      queryBuilder.andWhere('expense.createdAt <= :finalDate', { finalDate: finalDate });
    }

    let expenses = await queryBuilder.getMany();
    if (expenses.length == 0)
      return new Result(false, expenses, [{ message: "Expenses Not Found!" }], 404);

    expenses.forEach(expense => delete expense.updatedAt);
    return new Result(true, expenses);

  }

  async getById(accountId: string, expenseId: string): Promise<Result> {
    let user: User = new User()
    user.id = accountId;
    let expense = await this.expenseRepository.findOne({ where: { id: expenseId, user: user } });
    if (!expense)
      return new Result(false, expense, [{ message: "Expense Not Found!" }], 404);
    return new Result(true, expense);
  }

  async update(accountId: string, expenseId: string, updateExpenseDto: UpdateExpenseDto) {
    let user: User = new User()
    user.id = accountId;
    updateExpenseDto.value = -updateExpenseDto.value;
    let result = await this.expenseRepository.update({ id: expenseId, user: user }, updateExpenseDto);
    if (result.affected === 0)
      return new Result(false, [], [{ message: "Expense Not updated!" }], 500);
    return new Result(true, [], [{ message: "Expense updated!" }], 204);
  }

  async remove(accountId: string, expenseId: string): Promise<Result> {
    let user: User = new User()
    user.id = accountId;
    let result = await this.expenseRepository.delete({ id: expenseId, user: user });
    if (result.affected === 0)
      return new Result(false, [], [{ message: "Expense Not deleted!" }], 500);
    return new Result(true, [], [{ message: "Expense deleted!" }], 200);
  }
}
