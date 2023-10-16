import { FindTransactionDto } from '@/internal/dto/transaction'
import regex from '@/utils/regex'

export function findData(data: FindTransactionDto): boolean {
  let isValid = true

  isValid &&= regex.UUID.test(data.userId)
  if (data.initialDate) {
    isValid &&= data.initialDate !== ''
    const date = new Date(data.initialDate)
    isValid &&= date instanceof Date && !isNaN(date.valueOf())
  }

  if (data.finalDate) {
    isValid &&= data.finalDate !== ''
    const date = new Date(data.finalDate)
    isValid &&= date instanceof Date && !isNaN(date.valueOf())
  }

  return isValid
}
