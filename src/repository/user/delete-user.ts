import prismaClient from "@/external/prisma";

export default async function deleteUser(id: string) {
  return await prismaClient.user.delete({
    where: {
      id,
    },
  });
}
