import { EntityRepository, getRepository, Repository } from "typeorm";
import { Transaction } from "../model/Transaction";

@EntityRepository(Transaction)
class TransictionsRepository {
  private ormRepository: Repository<Transaction>
  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async create(
    username: string, email: string, password: string, balance: number
  ): Promise<Transaction> {
    const user = await this.ormRepository.create({
    })

    return user;
  }
  
  public async save(transiction: Transaction): Promise<Transaction> {
    return await this.ormRepository.save(transiction)
  }

  public async findAll(): Promise<Transaction[]> {
    return await this.ormRepository.find()
  }

} export {TransictionsRepository}