import prismaClient from "@/external/prisma";

export default async function findOneUser(id: string) {
  return prismaClient.user.findFirst();
}
