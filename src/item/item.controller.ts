import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common';
import { Response } from 'express';
import { BadRequestExceptionFilter } from 'src/schema/ExceptionFilter';
import { createItemDto as IItem } from './dto/item.create.dto';
import { Item } from './item.entity';
import { ItemService } from './item.service';
@Controller('item')
export class itemController {
  constructor(private readonly itemService: ItemService) {}
  @Get()
  findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }
  @Post()
  @UseFilters(new BadRequestExceptionFilter())
  async createUser(@Res() res: Response, @Body() data: IItem) {
    const item: IItem = await this.itemService.createItem(data);
    return res.status(HttpStatus.CREATED).json(item);
  }
}
