import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import Decimal from 'decimal.js';
import { DecimalTransformer } from 'src/util/DecimalTransformer';
import { Repository, Between } from 'typeorm';
import { Item } from './item.entity';
@Injectable()
export class ItemService {
  constructor(
    @Inject('ITEM_REPOSITORY')
    private itemRepository: Repository<Item>,
  ) {}

  pagination({ result, total, take, skip }): object {
    return {
      infoPage: {
        totalPage: total / take,
        currentPage: skip === 0 ? 1 : skip,
        totalItems: total,
      },
      data: result,
    };
  }

  async findAll(take = 10, skip = 0): Promise<Item[] | object> {
    const [result, total] = await this.itemRepository.findAndCount({
      take,
      skip,
    });
    return this.pagination({ result, total, take, skip });
  }

  async findById(id): Promise<Item | null> {
    const item = await this.itemRepository.findOne({ where: { id: +id } });
    if (!item) {
      throw new HttpException(
        { message: 'Transation not found.' },
        HttpStatus.NOT_FOUND,
      );
    }
    return item;
  }

  async createItem(data): Promise<Item | any> {
    try {
      const newItem = { createdDate: new Date(), ...data };
      const item = await this.itemRepository.save(newItem);
      return this.itemRepository.save(item);
    } catch (error) {
      throw new HttpException(
        { message: 'User not found. Verify if `user` of this id is created.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // https://stackoverflow.com/questions/47792808/typeorm-update-item-and-return-it
  async updateItemById(id, data): Promise<Item | any> {
    try {
      const item = await this.itemRepository.findOne({ where: { id: +id } });
      if (!item) return null;
      const newItem = { updatedDate: new Date(), ...data, id: +id };
      await this.itemRepository.save(newItem);
      return await this.itemRepository.findOne({ where: { id: +id } });
    } catch (error) {
      throw new HttpException(
        { message: 'User not found. Verify if `user` of this id is created.' },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteItemById(id): Promise<void> {
    const item = await this.itemRepository.findOne({ where: { id: +id } });
    if (!item) {
      throw new HttpException(
        { message: 'Transation not found.' },
        HttpStatus.NOT_FOUND,
      );
    }
    await this.itemRepository.delete(id);
  }

  async getBalance() {
    const item: Item[] = await this.itemRepository.find({
      select: ['value', 'inputValue'],
    });
    if (!item.length) return { balance: 0 };
    const formatValue = new DecimalTransformer();
    const balance = item.reduce((acc: any | string | number, cur) => {
      return cur.inputValue
        ? formatValue.sum(acc, (cur.value as Decimal).toString())
        : formatValue.sub(acc, (cur.value as Decimal).toString());
    }, 0);
    return { balance };
  }

  async filterByDate({
    dateInit,
    dateEnd,
    take = 10,
    skip = 0,
  }): Promise<Item[] | object> {
    const [result, total] = await this.itemRepository.findAndCount({
      where: {
        createdDate: Between(dateInit, dateEnd),
      },
      take,
      skip,
    });
    return this.pagination({ result, total, take, skip });
  }
}
