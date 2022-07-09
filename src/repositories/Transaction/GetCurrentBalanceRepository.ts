import { PrismaClient } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { IGetCurrentBalanceRepository } from "../../domain/interface/repositories/Transaction/IGetCurrentBalanceRepository";

export class GetCurrentBalanceRepository
  implements IGetCurrentBalanceRepository
{
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = prismaClient;
  }
  async getCurrentBalance(accountId: string): Promise<number> {
    const transaction = await this.prismaClient.transaction.findFirst({
      where: {
        accountId,
      },
      select: {
        currentBalance: true,
      },
      orderBy: {
        created_at: "desc",
      },
      take: 1,
    });
    return transaction ? transaction.currentBalance : 0;
  }
}
