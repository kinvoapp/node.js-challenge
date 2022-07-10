import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    return await this.expenseRepository.save(createExpenseDto);
  }

  async getAll(model: GetAllExpensesDto, page: number): Promise<Expense[]> {
    if (page !== 0) page = page * 2;

    let queryBuilder = await this.expenseRepository.createQueryBuilder('expense')
      .skip(page)
      .take(2)
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

    return await queryBuilder.getMany();
  }

  async getById(expenseId: string): Promise<Expense> {
    return await this.expenseRepository.findOne({ where: { id: expenseId } });
  }

  async update(expenseId: string, updateExpenseDto: UpdateExpenseDto)/* : Promise<Expense> */ {
    return await this.expenseRepository.update({ id: expenseId }, updateExpenseDto);
  }

  async remove(expenseId: string) {
    return await this.expenseRepository.delete({ id: expenseId });
  }
}
