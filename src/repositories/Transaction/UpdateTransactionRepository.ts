import { PrismaClient } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { IUpdateTransactionRepository } from "../../domain/interface/repositories/Transaction/IUpdateTransactionRepository";
import {
  IUpdateTransactionData,
  ICreateTransactionResponse,
  IBalanceInfo,
} from "../../domain/requestDto";
import { buildTransactionSelect } from "../Helpers/selectBuilder";

export class UpdateTransactionRepository
  implements IUpdateTransactionRepository
{
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = prismaClient;
  }
  async updateTransaction(
    id: string,
    data: IUpdateTransactionData,
    balanceInfo?: IBalanceInfo
  ): Promise<ICreateTransactionResponse> {
    const updatedTransaction = await this.prismaClient.$transaction(
      async (prismaTransaction) => {
        const transaction = await prismaTransaction.transaction.update({
          data: {
            ...data,
          },
          where: {
            id,
          },
          select: buildTransactionSelect(),
        });
        if (balanceInfo) {
          await prismaTransaction.balance.update({
            data: {
              available: balanceInfo.newBalance,
            },
            where: {
              id: balanceInfo.id,
            },
          });
        }
        return transaction;
      }
    );
    return updatedTransaction;
  }
}
