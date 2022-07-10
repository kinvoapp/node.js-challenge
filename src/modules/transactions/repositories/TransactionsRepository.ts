import { Between, EntityRepository, getRepository, Repository } from "typeorm";
import { ITransactionsPagination } from "../model/ITransactionsPagination";
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

    
  public async delete(transaction: Transaction): Promise<Transaction> {
    return await this.ormRepository.remove(transaction)
  }

    public async findById(transaction_id: string): Promise<Transaction | undefined> {
    const transaction = await this.ormRepository.createQueryBuilder('transactions')
      .where('transactions.id = :transaction_id', { transaction_id: transaction_id }).getOne()
    return transaction
  }

  public async findByUserId(user_id: string, page: number, perPage: number): Promise<ITransactionsPagination> {
    const transactions = await this.ormRepository.createQueryBuilder('transactions').where('user_id = :user_id', { user_id: user_id })
      .skip((page - 1) * perPage)
      .take(perPage)
      .getMany()
    
    const total = await this.ormRepository.createQueryBuilder('transactions').where('user_id = :user_id', { user_id: user_id }).getCount()
    
    return {transactions, total}
  }

  public async findAll(): Promise<Transaction[]> {
    return await this.ormRepository.find()
  }

  public async filterTransactionsByDate(user_id: string, initial_date: Date, final_date: Date, page: number, perPage: number): Promise<ITransactionsPagination> {
    const transactions = await this.ormRepository.createQueryBuilder('transactions').where('user_id = :user_id', { user_id: user_id })
      .andWhere('created_at BETWEEN :initial_date AND :final_date', { initial_date: initial_date, final_date: final_date })
      .getMany()
    
    const total = await this.ormRepository.createQueryBuilder('transactions').where('user_id = :user_id', { user_id: user_id })
      .andWhere('created_at BETWEEN :initial_date AND :final_date', { initial_date: initial_date, final_date: final_date })
      .getCount()


    return {transactions, total}
  }

} export {TransactionsRepository}