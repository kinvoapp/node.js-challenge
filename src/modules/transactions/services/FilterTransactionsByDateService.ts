import { inject, injectable } from "tsyringe";
import { ITransactionsPagination } from "../model/ITransactionsPagination";
import { Transaction } from "../model/Transaction";
import { TransactionsRepository } from "../repositories/TransactionsRepository";


@injectable()

class FilterTransactionsByDateService {
  constructor(
    @inject('TransactionsRepository') private transactionsRepository: TransactionsRepository
  ) { }
  
  public async execute(user_id: string, initial_date: Date, final_date: Date, page: number, perPage: number): Promise<ITransactionsPagination> {
    const transactions = await this.transactionsRepository.filterTransactionsByDate(user_id, initial_date, final_date, page, perPage)

    return transactions


  }
} export {FilterTransactionsByDateService}