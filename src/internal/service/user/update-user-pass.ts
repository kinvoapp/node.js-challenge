import { UpdateUserPassDto } from '@/internal/dto/user'
import InvalidDataError from '@/internal/error/invalid-data'
import { UserRepository } from '@/internal/interface/repository/user'
import { validateUser } from '@/internal/validation/user'

export default async function updateUserPass(
  repository: UserRepository,
  id: string,
  data: UpdateUserPassDto
) {
  const isValid = validateUser.updatePass(id, data)
  if (!isValid) throw new InvalidDataError()

  return repository.update(id, { password: data.newPassword })
}
