import prismaClient from '@/external/prisma'

export default async function findOneTransaction(id: string) {
  return await prismaClient.transaction.findFirst({
    where: {
      id,
    },
  })
}
