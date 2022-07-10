import { TransactionsRepository } from '../repositories/TransactionsRepository'

export class ListTransaction {
  constructor(private transactionsRepo: TransactionsRepository) {}

  async execute() {
    const response = await this.transactionsRepo.show()
    const transactions = response.map(transaction => transaction.props)
    return transactions
  }
}
