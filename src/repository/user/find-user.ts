import prismaClient from '@/external/prisma'
import { FindUserDto } from '@/internal/dto/user/find-user.dto'

export default async function findUser(data?: FindUserDto) {
  return await prismaClient.user.findMany({
    skip: data?.offset,
    take: data?.limit,
    where: {},
  })
}
