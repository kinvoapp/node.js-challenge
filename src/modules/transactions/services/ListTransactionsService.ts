import { inject, injectable } from "tsyringe";
import { TransactionsRepository } from "../repositories/TransactionsRepository";


@injectable()

class ListTransactionsService {
  constructor(
    @inject('TransactionsRepository') private transactionsRepository: TransactionsRepository
  ) { }
  
  public async execute(user_id: string) {
    const transactions = await this.transactionsRepository.findByUserId(user_id)

    return transactions


  }
} export {ListTransactionsService}