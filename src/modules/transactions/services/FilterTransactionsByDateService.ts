import { inject, injectable } from "tsyringe";
import { ITransactionsPagination } from "../model/ITransactionsPagination";
import { Transaction } from "../model/Transaction";
import { TransactionsRepository } from "../repositories/TransactionsRepository";


@injectable()

class FilterTransactionsByDateService {
  constructor(
    @inject('TransactionsRepository') private transactionsRepository: TransactionsRepository
  ) { }
  
  public async execute(user_id: string, initial_date: string, final_date: string, page: number, perPage: number): Promise<ITransactionsPagination> {

    console.log('aqui')

    const transactions = await this.transactionsRepository.filterTransactionsByDate(user_id, new Date(initial_date), new Date(final_date), page, perPage)

    return transactions


  }
} export {FilterTransactionsByDateService}