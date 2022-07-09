import { PrismaClient } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { IFindAccountByIdRepository } from "../../domain/interface/repositories/Account/IFindAccountByIdRepository";
import { ICreateAccountResponse } from "../../domain/requestDto";

export class FindAccountByIdRepository implements IFindAccountByIdRepository {
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = prismaClient;
  }

  async findAccountById(id: string): Promise<ICreateAccountResponse | null> {
    const account = await this.prismaClient.account.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        studentId: true,
        created_at: true,
        updated_at: true,
      },
    });
    return account;
  }
}
