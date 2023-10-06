import prismaClient from "@/external/prisma";
import { FindTransactionDto } from "@/internal/dto/transaction";

export default async function findTransaction({
  initialDate,
  finalDate,
}: FindTransactionDto) {
  const transactions = await prismaClient.transaction.findMany({
    where: {
      created_at: {
        gte: initialDate,
        lte: finalDate,
      },
    },
  });
  return transactions;
}
