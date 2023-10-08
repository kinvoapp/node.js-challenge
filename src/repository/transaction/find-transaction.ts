import prismaClient from "@/external/prisma";
import { FindTransactionDto } from "@/internal/dto/transaction";

export default async function findTransaction({
  initialDate,
  finalDate,
}: FindTransactionDto) {
  const transactions = await prismaClient.transaction.findMany({
    where: {
      created_at: {
        gte: initialDate ? new Date(initialDate) : undefined,
        lte: finalDate ? new Date(finalDate) : undefined,
      },
    },
  });
  return transactions;
}
