import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from 'src/shared/utils/result';
import { Utils } from 'src/shared/utils/utils';
import { Between, LessThan, MoreThan, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { GetAllRevenuesDto } from './dto/get-all-revenue.dto';
import { UpdateRevenueDto } from './dto/update-revenue.dto';
import { Revenue } from './entities/revenue.entity';

@Injectable()
export class RevenueService {
  constructor(
    @InjectRepository(Revenue)
    private readonly revenueRepository: Repository<Revenue>
  ) { }

  async create(accountId: string, createRevenueDto: CreateRevenueDto): Promise<Result> {
    createRevenueDto['user'] = accountId;
    await this.revenueRepository.save(createRevenueDto);
    return new Result(true, [], [{ message: 'Revenue added!' }], 201);
  }

  async getAll(accountId: string, model: GetAllRevenuesDto, page: number): Promise<Result> {
    if (page !== 0) page = page * 2;

    let queryBuilder = await this.revenueRepository.createQueryBuilder('revenue')
      .skip(page)
      .take(2)
      .where('revenue.user = :user', { user: accountId })
      .orderBy('revenue.createdAt', 'DESC');

    let startDate: Date;
    let finalDate: Date;

    if (model.startDate) {
      startDate = new Date(model.startDate);
      queryBuilder.andWhere('revenue.createdAt >= :startDate', { startDate: startDate });
    }

    if (model.finalDate) {
      finalDate = new Date(model.finalDate);
      queryBuilder.andWhere('revenue.createdAt <= :finalDate', { finalDate: finalDate });
    }

    let revenues = await queryBuilder.getMany();
    revenues.forEach(revenue => delete revenue.updatedAt);
    return new Result(true, revenues);

  }

  async getById(accountId: string, revenueId: string): Promise<Result> {
    let user = Utils.getUserWithAccountId(accountId);
    let revenue = await this.revenueRepository.findOne({ where: { id: revenueId, user: user } });
    if (!revenue)
      return new Result(false, revenue, [{ message: "RFevenue Not Found!" }], 404);
    return new Result(true, revenue);
  }

  async update(accountId: string, revenueId: string, updateRevenueDto: UpdateRevenueDto): Promise<Result> {
    let user = Utils.getUserWithAccountId(accountId);
    let result = await this.revenueRepository.update({ id: revenueId, user: user }, updateRevenueDto);
    if (result.affected === 0)
      return new Result(false, [], [{ message: "Revenue Not updated!" }], 500);
    return new Result(true, [], [{ message: "Revenue updated!" }], 204);
  }

  async remove(accountId: string, revenueId: string): Promise<Result> {
    let user = Utils.getUserWithAccountId(accountId);
    let result = await this.revenueRepository.delete({ id: revenueId, user: user });
    if (result.affected === 0)
      return new Result(false, [], [{ message: "Revenue Not deleted!" }], 500);
    return new Result(true, [], [{ message: "Revenue deleted!" }], 204);
  }
}
