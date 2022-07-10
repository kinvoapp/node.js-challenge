import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { Item } from './item.entity';
import { User } from 'src/user/user.entity';
import 'reflect-metadata';
import { createRequest, createResponse } from 'node-mocks-http';
import { createItemDto } from './dto/item.create.dto';
import { DecimalTransformer } from 'src/util/DecimalTransformer';

const newUserEntity: User = new User({
  id: 1,
  name: 'Jao Santos',
  email: 'jao@email.com',
  password: '$2b$08$4BJUIevoPBbNWITBtRj2IePWSowvOtt2WNxGrdI2kZk9tiI2HwfP2',
});

const itemEntityList: Item[] = [
  new Item({
    id: 1,
    title: 'Salário',
    value: '3000.1',
    inputValue: true,
    createdDate: '2022-07-10T19:18:58.919Z',
    updatedDate: '',
    description: 'Salário do mês',
    user: newUserEntity,
  }),
];

const mockFindAll = {
  infoPage: {
    totalPage: 0,
    currentPage: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },
  data: itemEntityList,
};

const getBalance: object = {
  balance: '3000.1',
};

const updateItemEntity: Item = new Item({
  title: 'Salário',
  value: '3000.1',
  inputValue: true,
  createdDate: '2022-07-10T19:18:58.919Z',
  updatedDate: '2022-07-10T19:20:58.919Z',
  description: 'Salário do mês',
});

const format = new DecimalTransformer();

const item: createItemDto = {
  title: 'Salário',
  value: format.from('3000.1'),
  inputValue: true,
  createdDate: new Date('2022-07-10T19:18:58.919Z'),
  updatedDate: null,
  description: 'Salário do mês',
  user: 1,
};

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
            findAll: jest.fn().mockResolvedValue(mockFindAll),
            getBalance: jest.fn().mockResolvedValue(getBalance),
            findById: jest.fn().mockResolvedValue(itemEntityList[0]),
            filterByDate: jest.fn().mockResolvedValue(mockFindAll),
            createItem: jest.fn().mockResolvedValue(itemEntityList[0]),
            updateItemById: jest.fn().mockResolvedValue(updateItemEntity),
            deleteItemById: jest.fn().mockResolvedValue({}),
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

  describe('findAll', (): void => {
    it('should return an array of items, successfully', async (): Promise<void> => {
      const query = createRequest().query;
      const result: Item[] | object = await itemController.findAll(query);

      expect(result).toEqual(mockFindAll);
      expect(typeof result).toBe('object');
      expect(itemService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throm an expected error', async (): Promise<void> => {
      jest.spyOn(itemService, 'findAll').mockRejectedValueOnce(new Error());
      const query = createRequest().query;

      expect(itemController.findAll(query)).rejects.toThrowError();
    });
  });

  describe('getBalance', () => {
    it('should return the balance', async () => {
      const result: Item[] | object = await itemController.getBalance();

      expect(result).toEqual(getBalance);
      expect(typeof result).toBe('object');
      expect(itemService.getBalance).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should return a item, successfully', async () => {
      const id = { id: '1' };
      const rep = createResponse();
      await itemController.getItemById(rep, id);

      expect(rep._getJSONData()).toEqual(itemEntityList[0]);
    });

    it('should throm an expected error', async () => {
      jest.spyOn(itemService, 'findById').mockRejectedValueOnce(new Error());
      const id = { id: '1' };
      const rep = createResponse();

      expect(itemController.getItemById(rep, id)).rejects.toThrowError();
    });
  });

  describe('filterByDate', () => {
    it('should return an array of items, successfully', async () => {
      const req = createRequest();
      const rep = createResponse();
      const param = { dateInit: '2021-01-01', dateEnd: '2023-12-30' };
      await itemController.getByDate(rep, param, req.query);

      expect(rep._getJSONData()).toEqual(mockFindAll);
      expect(typeof rep._getJSONData()).toBe('object');
      expect(itemService.filterByDate).toHaveBeenCalledTimes(1);
    });

    it('should throm an expected error', async () => {
      jest
        .spyOn(itemService, 'filterByDate')
        .mockRejectedValueOnce(new Error());
      const req = createRequest();
      req.rep = createResponse();
      const param = { dateInit: '2021-01-01', dateEnd: '2023-12-30' };

      expect(
        itemController.getByDate(req.rep, param, req.query),
      ).rejects.toThrowError();
    });
  });

  describe('createItem', () => {
    it('should create a item, successfully', async () => {
      const res = createResponse();
      await itemController.createItem(res, item);
      expect(res._getJSONData()).toEqual(itemEntityList[0]);
      expect(typeof res._getJSONData()).toBe('object');
      expect(itemService.createItem).toHaveBeenCalledTimes(1);
    });

    it('should throm an expected error', async () => {
      jest.spyOn(itemService, 'createItem').mockRejectedValueOnce(new Error());
      const res = createResponse();
      await expect(itemController.createItem(res, item)).rejects.toThrowError();
    });
  });

  describe('updateItemById', () => {
    it('should update a item, successfully', async () => {
      const res = createResponse();
      const id = { id: '1' };
      const body: createItemDto = {
        title: 'Salário',
        value: format.from('3000.1'),
        inputValue: true,
        description: 'Salário do mês',
        user: 1,
      };
      await itemController.updateItemById(res, id, body);

      expect(res._getJSONData()).toEqual(updateItemEntity);
      expect(typeof res._getJSONData()).toBe('object');
      expect(itemService.updateItemById).toHaveBeenCalledTimes(1);
    });

    it('should throm an expected error', async () => {
      jest
        .spyOn(itemService, 'updateItemById')
        .mockRejectedValueOnce(new Error());
      const res = createResponse();
      const id = { id: '1' };
      const body: createItemDto = {
        title: 'Salário',
        value: format.from('3000.1'),
        inputValue: true,
        description: 'Salário do mês',
        user: 1,
      };
      await expect(
        itemController.updateItemById(res, id, body),
      ).rejects.toThrowError();
    });
  });

  describe('deleteItemById', () => {
    it('should remove an item, successfully', async () => {
      const res = createResponse();
      const id = { id: '1' };
      await itemController.deleteItemById(res, id);

      expect(res._getJSONData()).toEqual({});
    });

    it('should throm an expected error', async () => {
      jest
        .spyOn(itemService, 'deleteItemById')
        .mockRejectedValueOnce(new Error());
      const res = createResponse();
      const id = { id: '1' };

      await expect(
        itemController.deleteItemById(res, id),
      ).rejects.toThrowError();
    });
  });
});
