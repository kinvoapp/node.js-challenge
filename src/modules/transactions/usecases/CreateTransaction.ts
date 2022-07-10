import { Transaction, TransactionProps } from '../domain/transaction'
import { TransactionsRepository } from '../repositories/TransactionsRepository'

export class CreateTransaction {
  constructor(private transactionsRepo: TransactionsRepository) {}

  async execute(data: TransactionProps) {
    const transaction = Transaction.create(data)
    await this.transactionsRepo.create(transaction)
  }
}
