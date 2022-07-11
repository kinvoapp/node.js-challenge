import { TransactionsRepository } from '../repositories/TransactionsRepository'

export type ListByDateProps = {
  initialDate: string
  finalDate: string
}

export class ListTransactionByDate {
  constructor(private transactionsRepo: TransactionsRepository) {}

  async execute({ initialDate, finalDate }: ListByDateProps) {
    const response = await this.transactionsRepo.showWithDate(initialDate, finalDate)
    const transactions = response.map(transaction => transaction.props)
    return transactions
  }
}
