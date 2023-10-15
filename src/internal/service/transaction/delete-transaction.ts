import InvalidDataError from '@/internal/error/invalid-data'
import {TransactionRepository} from '@/internal/interface/repository/transaction'
import {validateTransaction} from '@/internal/validation/transaction'

export default async function deleteTransaction(repository: TransactionRepository, id: string) {
  const isValid = validateTransaction.deleteData(id)
  if (!isValid) throw new InvalidDataError()
  const isInDb = (await repository.findOne(id)) !== null
  if (!isInDb) {
    throw new InvalidDataError(`transaction with id: ${id}, doesn't exist`)
  }

  return repository.delete(id)
}
