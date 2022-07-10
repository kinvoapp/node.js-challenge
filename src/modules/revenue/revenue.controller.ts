import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Query, UseInterceptors, CacheInterceptor } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { UpdateRevenueDto } from './dto/update-revenue.dto';
import { Revenue } from './entities/revenue.entity';
import { GetAllRevenuesDto } from './dto/get-all-revenue.dto';

@Controller('revenues')
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) { }

  @Post()
  async create(@Body() createRevenueDto: CreateRevenueDto): Promise<Revenue> {
    try {
      return await this.revenueService.create(createRevenueDto);
    } catch (error) {
      throw new HttpException('Error in create revenue', 500);
    }
  }

  @Get('?')
  @UseInterceptors(CacheInterceptor)
  async getAll(@Query('page') page: number, @Body() model: GetAllRevenuesDto): Promise<Revenue[]> {
    try {
      return await this.revenueService.getAll(model, +page);
    } catch (error) {
      throw new HttpException('Error on get all revenue', 500);
    }
  }

  @Get(':revenueId')
  async findOne(@Param('revenueId') revenueId: string) {
    try {
      return await this.revenueService.getById(revenueId);
    } catch (error) {
      throw new HttpException('Error on get revenue by Id', 500);
    }
  }

  @Patch(':revenueId')
  update(@Param('revenueId') revenueId: string, @Body() updateRevenueDto: UpdateRevenueDto) {
    try {
      return this.revenueService.update(revenueId, updateRevenueDto);
    } catch (error) {
      throw new HttpException('Error on update revenue ', 500);
    }
  }

  @Delete(':revenueId')
  remove(@Param('revenueId') revenueId: string) {
    try {
      return this.revenueService.remove(revenueId);
    } catch (error) {
      throw new HttpException('Error on delete revenue ', 500);
    }
  }
}

