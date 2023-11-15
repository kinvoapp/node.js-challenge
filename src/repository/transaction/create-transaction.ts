import prismaClient from '@/external/prisma'
import { CreateTransactionDto } from '@/internal/dto/transaction'

export default async function createTransaction({ amount, type, userId }: CreateTransactionDto) {
  const transaction = await prismaClient.transaction.create({
    data: {
      amount,
      type,
      userId,
    },
  })
  return transaction
}
