import prismaClient from "@/external/prisma";
import { UpdateTransactionDto } from "@/internal/dto/transaction";

export default async function updateTransaction(
  id: string,
  data: UpdateTransactionDto,
) {
  return await prismaClient.transaction.update({
    data,
    where: {
      id,
    },
  });
}
