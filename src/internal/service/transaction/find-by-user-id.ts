import InvalidDataError from '@/internal/error/invalid-data'
import { TransactionRepository } from '@/internal/interface/repository/transaction'
import regex from '@/utils/regex'

export default async function findByUserId(repository: TransactionRepository, userId: string) {
  const isValid = regex.UUID.test(userId)
  if (!isValid) throw new InvalidDataError()

  return await repository.find({ userId })
}
