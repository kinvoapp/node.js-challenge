import { Types } from 'mongoose'

export type Hello = {
  message: string
};

export type TypeMovement = 'expense' | 'income'

export type Balance = {
  expenses: number
  incomes: number
  balance: number
}

export interface IMovement {
  _id?: Types.ObjectId | string
  type: TypeMovement
  value: number
  category: string
  date: string
  note?: string
}
