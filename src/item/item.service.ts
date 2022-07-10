import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { DecimalTransformer } from 'src/util/DecimalTransformer';
import { Repository, Between } from 'typeorm';
import { Item } from './item.entity';
@Injectable()
export class ItemService {
  constructor(
    @Inject('ITEM_REPOSITORY')
    private itemRepository: Repository<Item>,
  ) {}

  async findAll(url = undefined): Promise<Item[] | object> {
    const items = await this.itemRepository.find();
    if (!url) return items;
    return this.getBalance(items);
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

  async getBalance(item: any[]): Promise<{ balance: number }> {
    if (!item.length) return { balance: 0 };
    const formatValue = new DecimalTransformer();
    return {
      balance: item.reduce((acc, cur) => {
        return cur.inputValue
          ? formatValue.sum(acc, cur.value)
          : formatValue.sub(acc, cur.value);
      }, 0),
    };
  }

  async filterByDate(dateInit, dateEnd): Promise<Item[]> {
    const items = await this.itemRepository.find({
      where: {
        createdDate: Between(dateInit, dateEnd),
      },
    });
    return items;
  }
}
