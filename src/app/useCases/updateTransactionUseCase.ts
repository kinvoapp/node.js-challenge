import { ITransactionRepository } from "../../contracts/repositories/TransactionRepository"
import { AppError } from "../../infra/shared/errors/AppError"

export class UpdateTransactionUseCase {
  transactionRepository: ITransactionRepository
  constructor(transactionRepository: ITransactionRepository) {
    this.transactionRepository = transactionRepository
  }

  async execute(uid: string, transaction: Partial<{ amount: number; description: string; title: string; type: "income" | "expense" }>) {
    const transactionToUpdate = await this.transactionRepository.findByUid(uid)
    if (!transactionToUpdate) throw new AppError("Transaction was not found", 404)
    await this.transactionRepository.update(uid, transaction)
  }
}
