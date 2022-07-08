import { EntityRepository, getRepository, Repository } from "typeorm";
import { User } from "../models/User";

@EntityRepository(User)
class UsersRepository {
  private ormRepository: Repository<User>
  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(
    username: string, email: string, password: string, balance: number
  ): Promise<User> {
    const user = await this.ormRepository.create({
      username,
      email,
      password,
      balance
    })

    return user;
  }
  
  public async save(user: User): Promise<User> {
    return await this.ormRepository.save(user)
  }

  public async findAll(): Promise<User[]> {
    return await this.ormRepository.find()
  }

} export {UsersRepository}