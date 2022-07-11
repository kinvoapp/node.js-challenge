import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Brackets, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetAllUsersDto } from './dto/get-all-users.dto';
import { GetUserBalanceHistoryDto } from './dto/get-user-balance-history.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
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

  async getBalance(accountId: string): Promise<Result> {
    let { revenueTotal, expenseTotal } = await this.userRepository.createQueryBuilder('user')
      .innerJoinAndSelect('user.expenses', 'expenses')
      .innerJoinAndSelect('user.revenues', 'revenues')
      .select(" SUM(DISTINCT revenues.value)", "revenueTotal")
      .addSelect(" SUM(DISTINCT expenses.value)", "expenseTotal")
      .where('user.id = :accountId', { accountId: accountId })
      .getRawOne()

    let balance = (revenueTotal ?? 0) + (expenseTotal ?? 0);
    return new Result(true, balance)
  }

  async getHistory(accountId, model: GetUserBalanceHistoryDto, page: number) {
    if (page !== 0) page = page * 2;

    let queryBuilder = await this.userRepository.createQueryBuilder('user')
      .skip(page)
      .take(2)
      .innerJoinAndSelect('user.expenses', 'expenses')
      .innerJoinAndSelect('user.revenues', 'revenues')
      .where('user.id = :accountId', { accountId: accountId });

    let startDate: Date;
    let finalDate: Date;

    if (model.startDate) {
      startDate = new Date(model.startDate);
      queryBuilder.andWhere(new Brackets(qb => {
        qb.where('expenses.createdAt >= :startDate', { startDate: startDate });
        qb.orWhere('revenues.createdAt >= :startDate', { startDate: startDate });
      }));
    }

    if (model.finalDate) {
      finalDate = new Date(model.finalDate);
      queryBuilder.andWhere(new Brackets(qb => {
        qb.where('expenses.createdAt <= :finalDate', { finalDate: finalDate });
        qb.orWhere('revenues.createdAt <= :finalDate', { finalDate: finalDate });
      }));
    }

    let userHistory = await queryBuilder.getOne();

    let extract: any[] = [...userHistory.revenues, ...userHistory.expenses];
    extract.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    extract = extract.map(e => {
      return {
        title: e.title,
        description: e.description,
        value: e.value,
        date: e.createdAt
      }

    })
    let user = {
      id: userHistory.id,
      name: userHistory.name,
      extract: extract
    }
    return new Result(true, user)


  }

  async authenticate(email: string, password: string) {
    return await this.userRepository.findOne({
      where: { email: email, password: password },
      select: ['id', 'roles', 'active']
    });
  }
}
