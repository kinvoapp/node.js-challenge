import { CreateTransactionDto } from '@/internal/dto/transaction'

export function createData(data: CreateTransactionDto): boolean {
  let isValid = true

  const isNumber = typeof data.amount === 'number'
  isValid &&= isNumber
  const isGreaterThanZero = data.amount > 0
  isValid &&= isGreaterThanZero

  const isOfType = data.type === 'IN' || data.type === 'OUT'
  isValid &&= isOfType

  return isValid
}
