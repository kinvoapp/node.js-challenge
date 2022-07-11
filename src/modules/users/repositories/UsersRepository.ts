import { stringify } from "querystring";
import { EntityRepository, getRepository, Repository } from "typeorm";
import { IUsersRepository } from "../models/IUsersRepository";
import { User } from "../models/User";

@EntityRepository(User)
class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>
  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(
    username: string, email: string, password: string, balance: number
  ): Promise<User> {
    const user = this.ormRepository.create({
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

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.createQueryBuilder('users').where('users.email = :email', { email: email }).getOne()
    return user
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.createQueryBuilder('users')
      .leftJoinAndSelect('users.transactions', 'transactions')
      .where('users.id = :id', { id: id }).getOne()
    return user
  }

  public async updateBalance(id: string, balance: any): Promise<any>{
    const user = await this.ormRepository.update(id, { balance: balance })
    return user
  }



} export {UsersRepository}