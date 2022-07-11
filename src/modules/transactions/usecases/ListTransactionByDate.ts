import { TransactionsRepository } from '../repositories/TransactionsRepository'

export type ListByDateProps = {
  initialDate: string
  finalDate: string
}

export class ListTransactionByDate {
  constructor(private transactionsRepo: TransactionsRepository) {}

  async execute({ initialDate, finalDate }: ListByDateProps, page: number) {
    const response = await this.transactionsRepo.showWithDate(initialDate, finalDate, page)
    const transactions = response.map(transaction => transaction.props)
    return transactions
  }
}
