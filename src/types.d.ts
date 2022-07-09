import { Types } from 'mongoose'

export type Hello = {
  message: string
};

export type TypeMovement = 'expense' | 'income'

export interface IMovement {
  _id?: Types.ObjectId
  type: TypeMovement
  value: number
  category: string
  date: string
  note?: string
}
