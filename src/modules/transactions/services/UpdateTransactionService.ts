
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../users/models/IUsersRepository";
import { TransactionsRepository } from "../repositories/TransactionsRepository";
import { TransactionType } from "./CreateTransactionService";


@injectable()

class UpdateTransactionService {
  constructor(
    @inject('TransactionsRepository') private transactionsRepository: TransactionsRepository,
    @inject('UsersRepository') private usersRepository: IUsersRepository,

  ) { }
  
  public async execute(transaction_id: string, type: string, value: number, user_id: string) {
    const transaction = await this.transactionsRepository.findById(transaction_id)
    const user = await this.usersRepository.findById(user_id)
    if (!transaction) throw Error()

    transaction.type === TransactionType.EXPENSE ? user.balance += transaction.value : user.balance -= transaction.value;


    transaction.type = type;
    transaction.value = value
    transaction.updated_at = new Date()

    type === TransactionType.EXPENSE ? user.balance -= value : user.balance += value

    await this.transactionsRepository.save(transaction)
    await this.usersRepository.updateBalance(user.id, user.balance)
    

    

    return transaction;


  }
} export {UpdateTransactionService}