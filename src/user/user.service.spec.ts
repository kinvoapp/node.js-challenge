import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', (): void => {
  let userService: UserService;

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'USER_REPOSITORY',
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', (): void => {
    expect(userService).toBeDefined();
  });
});
