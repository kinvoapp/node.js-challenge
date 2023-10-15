import prismaClient from '@/external/prisma'

export default async function balanceUser(id: string) {
  const {_sum} = await prismaClient.transaction.aggregate({
    where: {
      userId: {
        equals: id,
      },
    },
    _sum: {
      amount: true,
    },
  })

  return Number(_sum.amount)
}
