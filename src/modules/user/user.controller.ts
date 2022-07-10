import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, UseInterceptors, CacheInterceptor, Query, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { GetAllUsersDto } from './dto/get-all-users.dto';
import { GetUserBalanceHistoryDto } from './dto/get-user-balance-history.dto';
import { Public } from 'src/shared/custom-decorators/is-public.decorator';
import { RoleInterceptor } from 'src/shared/interceptors/role.interceptor';
import { RolesType } from 'src/shared/types/roles.type';
import { TokenJwt } from 'src/shared/custom-decorators/token.decorator';
import { AuthService } from 'src/shared/auth/auth.service';
import { Result } from 'src/shared/utils/result';
import { Utils } from 'src/shared/utils/utils';
import { ContractValidator } from 'src/shared/utils/contract-validator';
import { CreateUserContract } from './contracts/create-user.contract';
import { ValidatorInterceptor } from 'src/shared/interceptors/validator.interceptor';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Public()
  @Post()
  @UseInterceptors(new ValidatorInterceptor(new CreateUserContract()))
  async create(@Body() createUserDto: CreateUserDto): Promise<Result> {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new HttpException(new Result(false, {}), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('?')
  @UseInterceptors(CacheInterceptor)
  @UseInterceptors(new RoleInterceptor([RolesType.ADMIN]))
  async getAll(@Query('page') page: number, @Body() model: GetAllUsersDto): Promise<Result> {
    try {
      return await this.userService.getAll(model, page);
    } catch (error) {
      throw new HttpException(new Result(false, {}), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('balance')
  @UseInterceptors(new RoleInterceptor([RolesType.ADMIN, RolesType.USER]))
  async balance(@TokenJwt() token: string): Promise<number> {
    try {
      let { accountId } = AuthService.decode(token);
      return await this.userService.getBalance(accountId);
    } catch (error) {
      throw new HttpException(new Result(false, {}), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/history?')
  @UseInterceptors(new RoleInterceptor([RolesType.ADMIN, RolesType.USER]))
  async history(@Body() model: GetUserBalanceHistoryDto, @Query('page') page: number, @TokenJwt() token: string) {
    try {
      let { accountId } = AuthService.decode(token);
      return await this.userService.getHistory(accountId, model, +page);
    } catch (error) {
      throw new HttpException(new Result(false, {}), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':userId')
  @UseInterceptors(new RoleInterceptor([RolesType.ADMIN]))
  async findOne(@Param('userId') userId: string): Promise<Result> {
    try {
      return await this.userService.getById(userId);
    } catch (error) {
      throw new HttpException(new Result(false, {}), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':userId')
  @UseInterceptors(new RoleInterceptor([RolesType.ADMIN, RolesType.USER]))
  async update(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto, @TokenJwt() token: string): Promise<Result> {
    try {
      let { accountId, roles } = AuthService.decode(token);
      if (!Utils.isAdmin(roles))
        userId = accountId;
      return await this.userService.update(userId, updateUserDto);
    } catch (error) {
      throw new HttpException(new Result(false, {}), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':userId')
  async remove(@Param('userId') userId: string, @TokenJwt() token: string): Promise<Result> {
    try {
      let { accountId } = AuthService.decode(token);
      return await this.userService.remove(userId);
    } catch (error) {
      throw new HttpException(new Result(false, {}), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
