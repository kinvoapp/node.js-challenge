import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Query, UseInterceptors, CacheInterceptor, HttpStatus } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { UpdateRevenueDto } from './dto/update-revenue.dto';
import { Revenue } from './entities/revenue.entity';
import { GetAllRevenuesDto } from './dto/get-all-revenue.dto';
import { RoleInterceptor } from 'src/shared/interceptors/role.interceptor';
import { RolesType } from 'src/shared/types/roles.type';
import { TokenJwt } from 'src/shared/custom-decorators/token.decorator';
import { AuthService } from 'src/shared/auth/auth.service';
import { Result } from 'src/shared/utils/result';
import { ValidatorInterceptor } from 'src/shared/interceptors/validator.interceptor';
import { CreateRevenueContract } from './contracts/create-revenue.contract';

@Controller('revenues')
export class RevenueController {
  constructor(private readonly revenueService: RevenueService) { }

  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateRevenueContract()))
  @UseInterceptors(new RoleInterceptor([RolesType.USER, RolesType.ADMIN]))
  async create(@Body() createRevenueDto: CreateRevenueDto, @TokenJwt() token: string): Promise<Result> {
    try {
      let { accountId } = AuthService.decode(token);
      return await this.revenueService.create(accountId, createRevenueDto);
    } catch (error) {
      throw new HttpException(new Result(false, {}), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('?')
  @UseInterceptors(new RoleInterceptor([RolesType.USER, RolesType.ADMIN]))
  @UseInterceptors(CacheInterceptor)
  async getAll(@Query('page') page: number, @Body() model: GetAllRevenuesDto, @TokenJwt() token: string): Promise<Result> {
    try {
      let { accountId } = AuthService.decode(token);
      return await this.revenueService.getAll(accountId, model, +page);
    } catch (error) {
      throw new HttpException(new Result(false, {}), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':revenueId')
  @UseInterceptors(new RoleInterceptor([RolesType.USER, RolesType.ADMIN]))
  async findOne(@Param('revenueId') revenueId: string, @TokenJwt() token: string): Promise<Result> {
    try {
      let { accountId } = AuthService.decode(token);
      return await this.revenueService.getById(accountId, revenueId);
    } catch (error) {
      throw new HttpException(new Result(false, {}), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':revenueId')
  @UseInterceptors(new RoleInterceptor([RolesType.USER, RolesType.ADMIN]))
  update(@Param('revenueId') revenueId: string, @Body() updateRevenueDto: UpdateRevenueDto, @TokenJwt() token: string): Promise<Result> {
    try {
      let { accountId } = AuthService.decode(token);
      return this.revenueService.update(accountId, revenueId, updateRevenueDto);
    } catch (error) {
      throw new HttpException(new Result(false, {}), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':revenueId')
  @UseInterceptors(new RoleInterceptor([RolesType.USER, RolesType.ADMIN]))
  remove(@Param('revenueId') revenueId: string, @TokenJwt() token: string): Promise<Result> {
    try {
      let { accountId } = AuthService.decode(token);
      return this.revenueService.remove(accountId, revenueId);
    } catch (error) {
      throw new HttpException(new Result(false, {}), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

