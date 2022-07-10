import { Transaction } from '../domain/transaction'

export interface TransactionsRepository {
  create(transaction: Transaction): Promise<void>
  save(transaction: Transaction): Promise<void>
  delete(id: String): Promise<void>
  show(): Promise<Transaction[]>
}
