import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { createUserDto } from './dto/user.dto';
import 'reflect-metadata';
import { createResponse } from 'node-mocks-http';

// https://www.youtube.com/watch?v=p1hzHVgG6bI
const userEntityList: User[] = [
  new User({
    id: 1,
    name: 'John Doe',
    email: 'jhon@email.com',
    password: '123456',
  }),
];

const newUserEntity: User = new User({
  id: 2,
  name: 'Jao Santos',
  email: 'jao@email.com',
  password: '$2b$08$4BJUIevoPBbNWITBtRj2IePWSowvOtt2WNxGrdI2kZk9tiI2HwfP2',
});

describe('UserController', (): void => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(userEntityList),
            createUser: jest.fn().mockResolvedValue(newUserEntity),
            deleteUser: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();
    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', async (): Promise<void> => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('findAll', (): void => {
    it('should return an array of users, successfully', async (): Promise<void> => {
      const result: User[] = await userController.findAll();

      expect(result).toEqual(userEntityList);
      expect(typeof result).toBe('object');
      expect(userService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throm an expected error', async (): Promise<void> => {
      jest.spyOn(userService, 'findAll').mockRejectedValue(new Error('Error'));

      await expect(userController.findAll()).rejects.toThrowError('Error');
    });
  });

  describe('createUser', (): void => {
    it('should return a new user, successfully', async (): Promise<void> => {
      const body: createUserDto = new User({
        name: 'Jao Santos',
        email: 'jao@email.com',
        password: '123456',
      });

      const res = createResponse();
      await userController.createUser(res, body);

      expect(res._getJSONData()).toEqual(newUserEntity);
      expect(userService.createUser).toHaveBeenCalledTimes(1);
      expect(userService.createUser).toHaveBeenCalledWith(body);
    });

    it('should throm an expected error', async (): Promise<void> => {
      jest.spyOn(userService, 'createUser').mockRejectedValueOnce(new Error());
      const body: createUserDto = new User({
        name: 'Jao Santos',
        email: 'jao@email.com',
        password: '123456',
      });
      const res = createResponse();

      expect(userController.createUser(res, body)).rejects.toThrowError();
    });
  });

  describe('deleteUser', (): void => {
    it('should return a deleted user, successfully', async (): Promise<void> => {
      const id = '1';

      const res = createResponse();
      await userController.deleteUser(res, { id });

      expect(res._getJSONData()).toEqual({});
      expect(userService.deleteUser).toHaveBeenCalledTimes(1);
      expect(userService.deleteUser).toHaveBeenCalledWith(id);
    });

    it('should throm an expected error', (): void => {
      jest.spyOn(userService, 'deleteUser').mockRejectedValueOnce(new Error());
      const id = '1';
      const res = createResponse();

      expect(userController.deleteUser(res, { id })).rejects.toThrowError();
    });
  });
});
