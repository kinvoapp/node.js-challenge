import prismaClient from '@/external/prisma'
import { CreateUserDto } from '@/internal/dto/user'

export default async function createUser(data: Omit<CreateUserDto, 'confirmPassword'>) {
  return await prismaClient.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  })
}
