import prismaClient from '@/external/prisma'
import { UpdateUserDto } from '@/internal/dto/user'

export default async function updateUser(id: string, data: UpdateUserDto) {
  return await prismaClient.user.update({
    where: {
      id,
    },
    data: {
      email: data.email,
      name: data.name,
      password: data.password,
    },
  })
}
