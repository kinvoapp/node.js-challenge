import prismaClient from "@/external/prisma";

export default async function deleteTransaction(id: string) {
  await prismaClient.transaction.delete({
    where: {
      id,
    },
  });
}
