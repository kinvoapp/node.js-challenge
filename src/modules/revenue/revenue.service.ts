import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThan, MoreThan, Repository } from 'typeorm';
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

  async create(createRevenueDto: CreateRevenueDto): Promise<Revenue> {
    return await this.revenueRepository.save(createRevenueDto);
  }

  async getAll(model: GetAllRevenuesDto, page: number): Promise<Revenue[]> {
    if (page !== 0) page = page * 2;

    let queryBuilder = await this.revenueRepository.createQueryBuilder('revenue')
      .skip(page)
      .take(2)
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

    return await queryBuilder.getMany();
  }

  async getById(revenueId: string): Promise<Revenue> {
    return await this.revenueRepository.findOne({ where: { id: revenueId } });
  }

  async update(revenueId: string, updateRevenueDto: UpdateRevenueDto) {
    return await this.revenueRepository.update({ id: revenueId }, updateRevenueDto);
  }

  async remove(revenueId: string) {
    return await this.revenueRepository.delete({ id: revenueId });
  }
}
