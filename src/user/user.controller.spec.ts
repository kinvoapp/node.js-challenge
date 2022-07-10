import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import 'reflect-metadata';
import { UserService } from './user.service';
import { User } from './user.entity';

// https://www.youtube.com/watch?v=p1hzHVgG6bI
const userEntityList: User[] = [
  new User({
    id: 1,
    name: 'John Doe',
    email: 'jhon@email.com',
    password: '123456',
  }),
];

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
            createUser: jest.fn(),
            deleteUser: jest.fn(),
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
});
