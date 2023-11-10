import { UserRepository } from '@/internal/interface/repository/user'

export default function userRepositoryFactory(repositoryMethods: UserRepository): UserRepository {
  return {
    create: repositoryMethods.create,
    find: repositoryMethods.find,
    findCount: repositoryMethods.findCount,
    findOne: repositoryMethods.findOne,
    update: repositoryMethods.update,
    delete: repositoryMethods.delete,
    balance: repositoryMethods.balance,
  }
}
