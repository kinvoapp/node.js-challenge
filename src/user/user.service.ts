import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
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

  async deleteUser(id): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: +id } });
    if (!user)
      throw new HttpException(
        { message: 'User not found' },
        HttpStatus.NOT_FOUND,
      );
    await this.userRepository.remove(user);
  }
}
