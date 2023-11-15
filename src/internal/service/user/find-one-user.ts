import { FindOneUserDto } from '@/internal/dto/user'
import { UserRepository } from '@/internal/interface/repository/user'

export default async function findOneUser(repository: UserRepository, data: FindOneUserDto) {
  return await repository.findOne(data)
}
