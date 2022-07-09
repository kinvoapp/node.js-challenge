import { PrismaClient } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { ICreateTransactionRepository } from "../../domain/interface/repositories/Transaction/ICreateTransactionRepository";
import {
  ICreateTransactionRequest,
  ICreateTransactionResponse,
} from "../../domain/requestDto";

export class CreateTransactionRepository
  implements ICreateTransactionRepository
{
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = prismaClient;
  }

  async createTransaction(
    data: ICreateTransactionRequest,
    newBalance: number,
    accountId: string,
    balanceId: string
  ): Promise<ICreateTransactionResponse> {
    const [transaction] = await this.prismaClient.$transaction([
      this.prismaClient.transaction.create({
        data: {
          ...data,
          accountId,
        },
        select: {
          id: true,
          accountId: true,
          amount: true,
          description: true,
          type: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      this.prismaClient.balance.update({
        where: {
          id: balanceId,
        },
        data: {
          available: newBalance,
        },
      }),
    ]);
    return transaction;
  }
}
