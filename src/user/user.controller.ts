import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import { BadRequestExceptionFilter } from 'src/schema/ExceptionFilter';
import { createUserDto as IUser } from './dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Post()
  @UseFilters(new BadRequestExceptionFilter())
  async createUser(@Res() res: Response, @Body() createUserDto: IUser) {
    const user: IUser = await this.userService.createUser(createUserDto);
    return res.status(HttpStatus.CREATED).json(user);
  }

  @Delete('/:id')
  @UseFilters(new BadRequestExceptionFilter())
  async deleteUser(
    @Res() res: Response,
    @Param() { id }: { id: number | string },
  ) {
    await this.userService.deleteUser(id);
    return res.status(HttpStatus.NO_CONTENT).json({});
  }
}
