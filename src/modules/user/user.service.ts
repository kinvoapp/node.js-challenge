import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetAllUsersDto } from './dto/get-all-users.dto';
import { GetUserBalanceHistoryDto } from './dto/get-user-balance-history.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AppDataSource } from "../../shared/data-source/data-source"
import { Expense } from '../expense/entities/expense.entity';
import { Revenue } from '../revenue/entities/revenue.entity';
import { Result } from 'src/shared/utils/result';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<Result> {
    let user = plainToClass(User, createUserDto)
    await this.userRepository.save(user);
    return new Result(true, [], [{ message: 'User created!' }], 201);
  }

  async getAll(model: GetAllUsersDto, page: number): Promise<Result> {
    if (page !== 0) page = page * 2;
    let queryBuilder = await this.userRepository.createQueryBuilder('user')
      .skip(page)
      .take(2)
      .orderBy('user.createdAt', 'DESC');

    let createdAt: Date;
    if (model.createdAt) {
      createdAt = new Date(model.createdAt);
      queryBuilder.andWhere('user.createdAt >= :createdAt', { createdAt: createdAt });
    }

    let users: User[] = await queryBuilder.getMany();
    if (users.length > 0)
      users.forEach(user => { delete user.password });
    return new Result(true, users);

  }

  async getById(userId: string): Promise<Result> {
    let user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user)
      return new Result(false, user, [{ message: "User Not Found!" }], 404);
    return new Result(true, user);
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<Result> {
    let user = plainToClass(User, updateUserDto)
    let result = await this.userRepository.update(userId, user);
    if (result.affected === 0)
      return new Result(false, [], [{ message: "User Not updated!" }], 500);
    return new Result(true, [], [{ message: "User updated!" }], 204);
  }

  async remove(userId: string): Promise<Result> {
    let result = await this.userRepository.delete(userId);
    if (result.affected === 0)
      return new Result(false, [], [{ message: "User Not deleted!" }], 500);
    return new Result(true, [], [{ message: "User deleted!" }], 204);
  }

  async getBalance(accountId: string): Promise<number> {
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

  async getHistory(accountId, model: GetUserBalanceHistoryDto, page: number) {
    if (page !== 0) page = page * 2;



  }

  async authenticate(email: string, password: string) {
    return await this.userRepository.findOne({
      where: { email: email, password: password },
      select: ['id', 'roles', 'active']
    });
  }
}
