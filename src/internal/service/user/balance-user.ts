import InvalidDataError from '@/internal/error/invalid-data'
import {UserRepository} from '@/internal/interface/repository/user'

export default async function balanceUser(repository: UserRepository, id: string) {
  const inDb = await repository.findOne({id})
  if (!inDb) throw new InvalidDataError(`user with id: ${id}, doesn't exist`)

  return repository.balance(id)
}
