import prismaClient from "@/external/prisma";

export default async function deleteTransaction(id: string) {
  return await prismaClient.transaction.delete({
    where: {
      id,
    },
  });
}
