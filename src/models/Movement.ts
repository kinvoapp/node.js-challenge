/**
 * **Model layer**
 * Here the movement model and schema is created to be used as a base in the database.
 */

import { Schema, model } from 'mongoose'
import { IMovement } from '../types'

const MovementSchema = new Schema<IMovement>({
  type: String,
  value: Number,
  category: String,
  date: String,
  note: String
})

const MovementModel = model<IMovement>('Movement', MovementSchema)

export default MovementModel
