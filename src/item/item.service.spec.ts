import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { ItemService } from './item.service';

describe('ItemService', (): void => {
  let itemService: ItemService;
  let itemRepository: Repository<Item>;

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemService,
        {
          provide: 'ITEM_REPOSITORY',
          useValue: {
            findAndCount: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    itemService = module.get<ItemService>(ItemService);
    itemRepository = module.get<Repository<Item>>('ITEM_REPOSITORY');
  });

  it('should be defined', (): void => {
    expect(itemService).toBeDefined();
    expect(itemRepository).toBeDefined();
  });
});
