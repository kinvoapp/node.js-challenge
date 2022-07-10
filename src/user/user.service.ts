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
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (user)
      throw new HttpException(
        { message: 'This `email` already exists in database' },
        HttpStatus.BAD_REQUEST,
      );
    return this.userRepository.save(data);
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
