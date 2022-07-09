import { EntityRepository, getRepository, Repository } from "typeorm";
import { Transaction } from "../model/Transaction";

@EntityRepository(Transaction)
class TransactionsRepository {
  private ormRepository: Repository<Transaction>
  constructor() {
    this.ormRepository = getRepository(Transaction);
  }

  public async create(
    type: string, value: number, user_id: string
  ): Promise<Transaction> {
    const transaction = this.ormRepository.create({
      type, value, user_id, 
    })

    return transaction;
  }
  
  public async save(transaction: Transaction): Promise<Transaction> {
    return await this.ormRepository.save(transaction)
  }

  public async findAll(): Promise<Transaction[]> {
    return await this.ormRepository.find()
  }

} export {TransactionsRepository}