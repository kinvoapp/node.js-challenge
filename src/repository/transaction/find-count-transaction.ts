import prismaClient from "@/external/prisma";
import { FindCountDto } from "@/internal/dto/transaction";

export default async function findCount({
  initialDate,
  finalDate,
}: FindCountDto) {
  return prismaClient.transaction.count({
    where: {
      created_at: {
        gte: initialDate ? new Date(initialDate) : undefined,
        lte: finalDate ? new Date(finalDate) : undefined,
      },
    },
  });
}
