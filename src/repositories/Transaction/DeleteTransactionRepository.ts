import { PrismaClient } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { IDeleteTransactionRepository } from "../../domain/interface/repositories/Transaction/IDeleteTransactionRepository";
import { IBalanceInfoWithType } from "../../domain/requestDto";

export class DeleteTransactionRepository
  implements IDeleteTransactionRepository
{
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = prismaClient;
  }
  async deleteTransaction(
    id: string,
    balanceInfo: IBalanceInfoWithType
  ): Promise<void> {
    await this.prismaClient.$transaction(async (prismaTransaction) => {
      await prismaTransaction.balance.update({
        data: {
          available: balanceInfo.newBalance,
        },
        where: {
          id: balanceInfo.id,
        },
      });
      await prismaTransaction.transaction.delete({
        where: {
          id,
        },
      });
    });
  }
}
