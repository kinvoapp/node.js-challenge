import { AppError } from "../../infra/shared/errors/AppError"

export class Transaction {
  uid: string
  title: string
  description: string
  amount: number
  type: "income" | "expense"
  date: Date
  createdAt: Date
  updatedAt: Date

  constructor({
    uid,
    title,
    amount,
    date,
    type,
    description,
    updatedAt,
    createdAt,
  }: {
    uid: string
    title: string
    date?: string
    amount: number
    type: "income" | "expense"
    description: string
    updatedAt?: Date
    createdAt?: Date
  }) {
    this.uid = uid
    this.title = this.validateTitle(title)
    this.description = this.validateDescription(description)
    this.amount = this.validateAmount(amount)
    this.type = this.validateType(type)
    this.date = date ? new Date(date) : new Date()
    this.createdAt = createdAt || new Date()
    this.updatedAt = updatedAt || new Date()
  }

  validateTitle(title): string {
    if (!title) throw new AppError("You must provide a title")
    return title
  }

  validateAmount(amount): number {
    if (isNaN(amount)) throw new AppError("Invalid transaction amount, must be a number")
    if (amount < 0) throw new AppError("Invalid transaction amount, must be greater than 0")
    return amount
  }

  validateDescription(description): string {
    if (!description) return ""
    return description
  }

  validateType(type): "income" | "expense" {
    if (type !== "income" && type !== "expense") throw new AppError("Invalid transaction type, must be income or expense")
    return type
  }
}
