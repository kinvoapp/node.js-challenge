import { TransactionsRepository } from '../repositories/TransactionsRepository'

export class GetBalance {
  constructor(private transactionsRepo: TransactionsRepository) {}

  async execute() {
    const transactions = await this.transactionsRepo.show()
    const balance = transactions.reduce((total, transaction) => {
      if (transaction.props.type === 'Deposit') {
        return (total += Number(transaction.props.value))
      } else {
        return (total -= Number(transaction.props.value))
      }
    }, 0)
    return balance
  }
}
