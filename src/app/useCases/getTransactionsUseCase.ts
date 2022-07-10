import { Transaction } from "../../domain/entities/Transaction"
import { ITransactionRepository } from "../../contracts/repositories/TransactionRepository"
import { AppError } from "../../infra/shared/errors/AppError"

export class GetTransactionUseCase {
  transactionsRepository: ITransactionRepository
  constructor(transactionRepository: ITransactionRepository) {
    this.transactionsRepository = transactionRepository
  }

  async execute(uid: string): Promise<Transaction> {
    const transaction = await this.transactionsRepository.findByUid(uid)
    if (!transaction) throw new AppError("Transaction was not found", 404)
    return transaction
  }
}
