import { Transaction } from "../../../domain/entities/Transaction"
import { ITransactionRepository, TransactionInput } from "../../../contracts/repositories/TransactionRepository"
import { AppError } from "../../../infra/shared/errors/AppError"

export class TransactionRepository implements ITransactionRepository {
  transactions: Transaction[] = []
  validOperators = ["=", ">", "<", ">=", "<=", "!="]
  constructor(transactions: Transaction[] = []) {
    this.transactions = transactions
  }

  async getBalance(): Promise<number> {
    let balance = 0
    this.transactions.map((transaction) => {
      if (transaction.type === "income") balance += transaction.amount
      if (transaction.type === "expense") balance -= transaction.amount
    })
    return balance
  }
  async create(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction)
  }

  async findAll({ page = 1, perPage = 10, query = [] }): Promise<{ rows: Transaction[]; page: number; totalPages: number }> {
    let rows = this.transactions
    query.map(([field, operator, value]) => {
      if (!this.validOperators.includes(operator)) throw new AppError("Invalid operator", 400)
      rows = rows.filter((transaction) => {
        const operators = {
          "=": transaction[field] === value,
          "!=": transaction[field] !== value,
          ">": transaction[field] > value,
          "<": transaction[field] < value,
          ">=": transaction[field] >= value,
          "<=": transaction[field] <= value,
        }
        return operators[operator]
      })
    })
    const totalPages = Math.ceil(rows.length / perPage)
    rows = rows.slice((page - 1) * perPage, page * perPage)
    return { rows, page, totalPages }
  }

  async findByUid(uid: string): Promise<Transaction | null> {
    return this.transactions.find((transaction) => transaction.uid === uid)
  }

  async update(uid: string, transaction: Partial<TransactionInput>): Promise<void> {
    const index = this.transactions.findIndex((transaction) => transaction.uid === uid)
    this.transactions[index] = new Transaction({
      ...this.transactions[index],
      date: transaction.date || String(this.transactions[index].date),
      ...transaction,
      updatedAt: new Date(),
    })
  }

  async delete(uid: string): Promise<void> {
    this.transactions = this.transactions.filter((transaction) => transaction.uid !== uid)
  }
}
