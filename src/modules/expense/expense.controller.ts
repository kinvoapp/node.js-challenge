import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Query, UseInterceptors, CacheInterceptor, HttpStatus } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { GetAllRevenuesDto } from '../revenue/dto/get-all-revenue.dto';
import { RoleInterceptor } from 'src/shared/interceptors/role.interceptor';
import { RolesType } from 'src/shared/types/roles.type';
import { TokenJwt } from 'src/shared/custom-decorators/token.decorator';
import { AuthService } from 'src/shared/auth/auth.service';
import { Utils } from 'src/shared/utils/utils';
import { Result } from 'src/shared/utils/result';
import { ValidatorInterceptor } from 'src/shared/interceptors/validator.interceptor';
import { CreateExpenseContract } from './contracts/create-expense.contract';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) { }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateExpenseContract()))
  @UseInterceptors(new RoleInterceptor([RolesType.USER, RolesType.ADMIN]))
  async create(@Body() createExpenseDto: CreateExpenseDto, @TokenJwt() token: string): Promise<Result> {
    try {
      let { accountId } = AuthService.decode(token);
      return await this.expenseService.create(accountId, createExpenseDto);
    } catch (error) {
      throw new HttpException(new Result(false, {}), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('?')
  @UseInterceptors(new RoleInterceptor([RolesType.USER, RolesType.ADMIN]))
  @UseInterceptors(CacheInterceptor)
  async getAll(@Query('page') page: number, @Body() model: GetAllRevenuesDto, @TokenJwt() token: string): Promise<Result> {
    try {
      let { accountId, roles } = AuthService.decode(token);
      if (Utils.isAdmin(roles))
        accountId = model.accountId;
      return await this.expenseService.getAll(accountId, model, +page);
    } catch (error) {
      throw new HttpException(new Result(false, {}), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':expenseId?')
  @UseInterceptors(new RoleInterceptor([RolesType.USER, RolesType.ADMIN]))
  async getById(@Param('expenseId') expenseId: string, @Query('accountId') accountId: string, @TokenJwt() token: string): Promise<Result> {
    try {
      let { roles } = AuthService.decode(token);
      if (!Utils.isAdmin(roles))
        accountId = AuthService.decode(token).accountId;
      return await this.expenseService.getById(accountId, expenseId);
    } catch (error) {
      throw new HttpException(new Result(false, {}), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':expenseId')
  @UseInterceptors(new RoleInterceptor([RolesType.USER, RolesType.ADMIN]))
  async update(@Param('expenseId') expenseId: string, @Body() updateExpenseDto: UpdateExpenseDto, @TokenJwt() token: string): Promise<Result> {
    try {
      let { accountId } = AuthService.decode(token);
      return await this.expenseService.update(accountId, expenseId, updateExpenseDto);
    } catch (error) {
      throw new HttpException(new Result(false, {}), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':expenseId')
  @UseInterceptors(new RoleInterceptor([RolesType.USER, RolesType.ADMIN]))
  async remove(@Param('expenseId') expenseId: string, @TokenJwt() token: string): Promise<Result> {
    try {
      let { accountId } = AuthService.decode(token);
      return await this.expenseService.remove(accountId, expenseId);
    } catch (error) {
      throw new HttpException(new Result(false, {}), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
