import { ValidOperators } from "../../@types"
import { ITransactionRepository } from "../../contracts/repositories/TransactionRepository"
import { Transaction } from "../../domain/entities/Transaction"
import { AppError } from "../../infra/shared/errors/AppError"

export class ListTransactionUseCase {
  transactionsRepository: ITransactionRepository
  constructor(transactionRepository: ITransactionRepository) {
    this.transactionsRepository = transactionRepository
  }

  async execute(
    page: number = 1,
    perPage: number = 25,
    query: [string, ValidOperators, string | number | Date][] = []
  ): Promise<{ page: number; totalPages: number; rows: Transaction[] }> {
    if (perPage > 100) throw new AppError("Maximum results per page is 100", 400)
    const transactions = await this.transactionsRepository.findAll({ page, perPage, query })
    return transactions
  }
}
