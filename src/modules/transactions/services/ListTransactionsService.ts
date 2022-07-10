import { inject, injectable } from "tsyringe";
import { ITransactionsPagination } from "../model/ITransactionsPagination";
import { Transaction } from "../model/Transaction";
import { TransactionsRepository } from "../repositories/TransactionsRepository";


@injectable()

class ListTransactionsService {
  constructor(
    @inject('TransactionsRepository') private transactionsRepository: TransactionsRepository
  ) { }
  
  public async execute(user_id: string, page: number, perPage: number): Promise<ITransactionsPagination> {
    const transactions = await this.transactionsRepository.findByUserId(user_id, page, perPage)

    return transactions


  }
} export {ListTransactionsService}