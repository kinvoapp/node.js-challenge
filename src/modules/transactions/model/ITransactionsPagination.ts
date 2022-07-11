import { Transaction } from "./Transaction"

export interface ITransactionsPagination {
  transactions: Transaction[],
  total: number
}