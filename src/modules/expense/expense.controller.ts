import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Query, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { GetAllRevenuesDto } from '../revenue/dto/get-all-revenue.dto';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) { }

  @Post()
  async create(@Body() createExpenseDto: CreateExpenseDto): Promise<Expense> {
    try {
      return await this.expenseService.create(createExpenseDto);
    } catch (error) {
      throw new HttpException('Error in create exprense', 500);
    }
  }

  @Get('?')
  @UseInterceptors(CacheInterceptor)
  async getAll(@Query('page') page: number, @Body() model: GetAllRevenuesDto): Promise<Expense[]> {
    try {
      return await this.expenseService.getAll(model, +page);
    } catch (error) {
      throw new HttpException('Error on get all exprense', 500);
    }
  }

  @Get(':expenseId')
  async getById(@Param('expenseId') expenseId: string): Promise<Expense> {
    try {
      return await this.expenseService.getById(expenseId);
    } catch (error) {
      throw new HttpException('Error on get exprense by Id', 500);
    }
  }

  @Patch(':expenseId')
  async update(@Param('expenseId') expenseId: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    try {
      return await this.expenseService.update(expenseId, updateExpenseDto);
    } catch (error) {
      throw new HttpException('Error on update exprense ', 500);
    }
  }

  @Delete(':expenseId')
  async remove(@Param('expenseId') expenseId: string) {
    try {
      return await this.expenseService.remove(expenseId);
    } catch (error) {
      throw new HttpException('Error on delete exprense ', 500);
    }
  }
}
