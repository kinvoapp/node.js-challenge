import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemService {
  constructor(
    @Inject('ITEM_REPOSITORY')
    private itemRepository: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async createItem(data) /* : Promise<Item> */ {
    console.log('SERVICE data', data);
    // const item = this.itemRepository.save(data);
    const item = await this.itemRepository.save(data);
    console.log('SERVICE item', item);
    // return this.itemRepository.save(item);
  }
}
