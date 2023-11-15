import prismaClient from '@/external/prisma'

export default async function findUserCount() {
  return await prismaClient.user.count()
}
