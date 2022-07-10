import { ValidOperators } from "../../@types"
import { Transaction } from "../../domain/entities/Transaction"

export type TransactionInput = {
  title: string
  amount: number
  type: "income" | "expense"
  date: string
  description: string
}

export class ITransactionRepository {
  getBalance(): Promise<number>
  create(transaction: Transaction): Promise<void>
  findAll({
    page,
    perPage,
    query,
  }: {
    page: number
    perPage: number
    query?: [string, ValidOperators, string | number | Date][]
  }): Promise<{ rows: Transaction[]; page: number; totalPages: number }>
  findByUid(uid: string): Promise<Transaction>
  update(uid: string, transaction: Partial<TransactionInput>): Promise<void>
  delete(uid: string): Promise<void>
}
