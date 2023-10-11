import prismaClient from "@/external/prisma";
import { CreateUserDto } from "@/internal/dto/user";

export default async function createUser(data: CreateUserDto) {
  return await prismaClient.user.create({
    data,
  });
}
