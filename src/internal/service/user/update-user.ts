import { UpdateUserDto } from '@/internal/dto/user'
import InvalidDataError from '@/internal/error/invalid-data'
import { UserRepository } from '@/internal/interface/repository/user'
import { validateUser } from '@/internal/validation/user'

export default async function updateUser(
  repository: UserRepository,
  id: string,
  data: UpdateUserDto
) {
  const isValid = validateUser.updateData(id, data)
  if (!isValid) throw new InvalidDataError()

  return repository.update(id, data)
}
