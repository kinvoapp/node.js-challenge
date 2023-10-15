import prismaClient from '@/external/prisma'
import {FindOneUserDto} from '@/internal/dto/user'

export default async function findOneUser(data: FindOneUserDto) {
  return prismaClient.user.findFirst({
    where: {
      OR: [
        {
          id: data.id,
        },
        {
          email: data.email,
        },
      ],
    },
  })
}
