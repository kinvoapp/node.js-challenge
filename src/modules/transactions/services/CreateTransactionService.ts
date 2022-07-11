import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../users/models/IUsersRepository";
import { Transaction } from "../model/Transaction";
import { TransactionsRepository } from "../repositories/TransactionsRepository";

export enum TransactionType {
  EXPENSE = 'EXPENSE',
  REVENUE = 'REVENUE'
  
}

@injectable()
class CreateTransactionService {
  constructor(
    @inject('TransactionsRepository') private transactionsRepository: TransactionsRepository,
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) { }
  
  public async execute(type: string, value: number, user_id: string): Promise<Transaction> {

    const newTransaction = await this.transactionsRepository.create(type, value, user_id)
    const user = await this.usersRepository.findById(user_id)
    
    type === TransactionType.EXPENSE ? user.balance -= value : user.balance += value
    const newBalance = user.balance
    
    try {
      await this.transactionsRepository.save(newTransaction)
      console.log(newTransaction)
      console.log(user)
      await this.usersRepository.updateBalance(user.id, newBalance)
    }catch (err) {
      console.log('EERO: ', err.message)
      throw Error()
    }


    return newTransaction

  }
} export {CreateTransactionService}