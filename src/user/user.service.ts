import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(data: createUserDto): Promise<createUserDto> {
    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;
    return this.userRepository.save(user);
  }
}
