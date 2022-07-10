import { TransactionRepository } from "../app/repositories/Memory/TransactionRepository"
import { Transaction } from "../domain/entities/Transaction"
import { ITransactionRepository } from "../contracts/repositories/TransactionRepository"

export class MemoryRepositoryFactory {
  memoryRepository: { transactions: Transaction[] } = {
    transactions: [],
  }

  createTransactionRepository(): ITransactionRepository {
    return new TransactionRepository(this.memoryRepository.transactions)
  }
}
