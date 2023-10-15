import {CreateUserDto} from '@/internal/dto/user'
import InvalidDataError from '@/internal/error/invalid-data'
import {UserRepository} from '@/internal/interface/repository/user'
import {validateUser} from '@/internal/validation/user'
import {crypt} from '../cryptography'

export default async function createUser(repository: UserRepository, data: CreateUserDto) {
  const isValid = validateUser.createData(data)
  if (!isValid) throw new InvalidDataError()
  const inDb = await repository.findOne({email: data.email})
  if (inDb) throw new InvalidDataError('email already taken')

  const hash = await crypt.hash(data.password)

  return await repository.create({
    ...data,
    password: hash,
  })
}
