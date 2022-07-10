import { ITransactionRepository } from "../../contracts/repositories/TransactionRepository"
import { AppError } from "../../infra/shared/errors/AppError"

export class DeleteTransactionUseCase {
  transactionRepository: ITransactionRepository
  constructor(transactionRepository: ITransactionRepository) {
    this.transactionRepository = transactionRepository
  }

  async execute(uid: string): Promise<void> {
    const transaction = await this.transactionRepository.findByUid(uid)
    if (!transaction) throw new AppError("Transaction was not found", 404)
    await this.transactionRepository.delete(uid)
  }
}
