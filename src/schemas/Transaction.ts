import { Schema, model, Document } from 'mongoose'

interface TransactionInterface extends Document {
  value: number,
  type: string,
  description: string
}

const TransactionSchema = new Schema({
  value: Number,
  type: String,
  description: String
}, {
  timestamps: true
})

export default model<TransactionInterface>('Transaction', TransactionSchema)
