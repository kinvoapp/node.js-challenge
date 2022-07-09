import { PrismaClient } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { IGetAccountWithBalanceRepository } from "../../domain/interface/repositories/Account/IGetAccountWithBalanceRepository";
import { IGetAccountWithBalanceInfo } from "../../domain/requestDto";

export class GetAccountWithBalanceRepository
  implements IGetAccountWithBalanceRepository
{
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = prismaClient;
  }
  async getAccountWithBalance(
    accountId: string
  ): Promise<IGetAccountWithBalanceInfo | null> {
    const account = await this.prismaClient.account.findUnique({
      where: {
        id: accountId,
      },
      select: {
        id: true,
        studentId: true,
        balance: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!account) {
      return null;
    }
    return {
      ...account,
      balanceId: account.balance.id,
      available: account.balance.available.toNumber(),
      balanceUpdatedAt: account.balance.updatedAt,
    };
  }
}
