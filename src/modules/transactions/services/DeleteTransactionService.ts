
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../users/models/IUsersRepository";
import { TransactionsRepository } from "../repositories/TransactionsRepository";
import { TransactionType } from "./CreateTransactionService";


@injectable()

class DeleteTransactionService {
  constructor(
    @inject('TransactionsRepository') private transactionsRepository: TransactionsRepository,
    @inject('UsersRepository') private usersRepository: IUsersRepository,

  ) { }
  
  public async execute(transaction_id: string, user_id: string): Promise<void>{
    const transaction = await this.transactionsRepository.findById(transaction_id)
    const user = await this.usersRepository.findById(user_id)

    console.log(transaction)
    if (!transaction) throw Error()

    transaction.type === TransactionType.EXPENSE ? user.balance += transaction.value : user.balance -= transaction.value;

    await this.transactionsRepository.delete(transaction)
    await this.usersRepository.updateBalance(user.id, user.balance)

    return;


  }
} export {DeleteTransactionService}