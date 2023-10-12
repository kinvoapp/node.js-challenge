import prismaClient from "@/external/prisma";
import { FindOneUser } from "@/internal/dto/user";

export default async function findOneUser(data: FindOneUser) {
  return prismaClient.user.findFirst({
    where: {
      OR: [
        {
          id: data.id,
        },
        {
          email: data.email,
        },
      ],
    },
  });
}
