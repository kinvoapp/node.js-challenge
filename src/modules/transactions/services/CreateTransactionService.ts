import { inject, injectable } from "tsyringe";
import { Transaction } from "../model/Transaction";
import { TransactionsRepository } from "../repositories/TransactionsRepository";


@injectable()
class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository') private transactionsRepository: TransactionsRepository
  ) { }
  
  public async execute(type: string, value: number, user_id: string): Promise<Transaction> {

    const newTransaction = await this.transactionsRepository.create(type, value, user_id)

    await this.transactionsRepository.save(newTransaction)

    return newTransaction

  }
} export {CreateTransactionService}