import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { createUserDto } from './dto/user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async createUser(data: createUserDto): Promise<object> {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (user)
      throw new HttpException(
        { message: 'This `email` already exists in database' },
        HttpStatus.BAD_REQUEST,
      );
    const userData = new User();
    userData.name = data.name;
    userData.email = data.email;
    userData.password = bcrypt.hashSync(data.password, 8);
    await this.userRepository.save(userData);
    return { message: 'User created successfully' };
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
