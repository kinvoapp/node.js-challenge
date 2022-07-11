import { TransactionsRepository } from '../repositories/TransactionsRepository'

export class ListTransaction {
  constructor(private transactionsRepo: TransactionsRepository) {}

  async execute(page: number) {
    const response = await this.transactionsRepo.show(page)
    const transactions = response.map(transaction => transaction.props)
    return transactions
  }
}
