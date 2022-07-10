import { Transaction } from '../domain/transaction'

export interface TransactionsRepository {
  create(transaction: Transaction): Promise<void>
}
