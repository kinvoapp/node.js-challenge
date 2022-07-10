import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

const userEntityList: User[] = [
  new User({ email: 'test1@email', name: 'test-1', password: '123456' }),
  new User({ email: 'test2@email', name: 'test-2', password: '123456' }),
];

const createdUserSuccessfully = { message: 'User created successfully' };

describe('UserService', (): void => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'USER_REPOSITORY',
          useValue: {
            find: jest.fn().mockReturnValue(userEntityList),
            findOne: jest.fn().mockReturnValue(undefined),
            save: jest.fn().mockReturnValue(createdUserSuccessfully),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>('USER_REPOSITORY');
  });

  it('should be defined', (): void => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('findAll', (): void => {
    it('should return an array of users', async (): Promise<void> => {
      const result = await userService.findAll();

      expect(result).toEqual(userEntityList);
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('createUser', (): void => {
    it('should created a user, successfully', async (): Promise<void> => {
      const body: createUserDto = {
        email: 'test@email',
        name: 'test',
        password: '123456',
      };
      const result = await userService.createUser(body);

      expect(result).toEqual(createdUserSuccessfully);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteUser', (): void => {
    it('should remove a user, successfully', async (): Promise<void> => {
      jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValueOnce(userEntityList[0]);
      const result = await userService.deleteUser(1);

      expect(result).toEqual(undefined);
      expect(userRepository.remove).toHaveBeenCalledTimes(1);
    });
  });
});
