import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import 'reflect-metadata';

describe('ItemController', (): void => {
  let itemController: ItemController;
  let itemService: ItemService;

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [
        {
          provide: ItemService,
          useValue: {
            findAll: jest.fn(),
            getBalance: jest.fn(),
            findById: jest.fn(),
            filterByDate: jest.fn(),
            createItem: jest.fn(),
            updateItemById: jest.fn(),
            deleteItemById: jest.fn(),
          },
        },
      ],
    }).compile();
    itemController = module.get<ItemController>(ItemController);
    itemService = module.get<ItemService>(ItemService);
  });

  it('should be defined', async (): Promise<void> => {
    expect(itemController).toBeDefined();
    expect(itemService).toBeDefined();
  });
});
