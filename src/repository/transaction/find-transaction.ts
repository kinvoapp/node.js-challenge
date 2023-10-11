import prismaClient from "@/external/prisma";
import { FindTransactionDto } from "@/internal/dto/transaction";

export default async function findTransaction({
  initialDate,
  finalDate,
  offset,
  limit,
}: FindTransactionDto = {}) {
  const transactions = await prismaClient.transaction.findMany({
    skip: offset,
    take: limit,
    where: {
      created_at: {
        gte: initialDate ? new Date(initialDate) : undefined,
        lte: finalDate ? new Date(finalDate) : undefined,
      },
    },
  });
  return transactions;
}
