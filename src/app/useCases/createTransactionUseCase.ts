import { Transaction } from "../../domain/entities/Transaction"
import { ITransactionRepository } from "../../contracts/repositories/TransactionRepository"
import { v4 } from "uuid"

export class CreateTransactionUseCase {
  transactionsRepository: ITransactionRepository
  constructor(transactionRepository: ITransactionRepository) {
    this.transactionsRepository = transactionRepository
  }

  async execute(transaction: {
    title: string
    description: string
    date?: string
    amount: number
    type: "income" | "expense"
  }): Promise<Transaction> {
    const newTransaction = new Transaction({
      uid: v4(),
      title: transaction.title,
      description: transaction.description,
      amount: transaction.amount,
      date: transaction.date,
      type: transaction.type,
    })
    await this.transactionsRepository.create(newTransaction)
    return newTransaction
  }
}
