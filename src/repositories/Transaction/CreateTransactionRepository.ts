import { PrismaClient, Transaction } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { ICreateTransactionRepository } from "../../domain/interface/repositories/Transaction/ICreateTransactionRepository";
import { ICreateTransactionRequest } from "../../domain/requestDto";

export class CreateTransactionRepository
  implements ICreateTransactionRepository
{
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = prismaClient;
  }

  async createTransaction(
    data: ICreateTransactionRequest,
    currentBalance: number
  ): Promise<Transaction> {
    if (data.type === "CASHIN") {
      const transaction = await this.prismaClient.transaction.create({
        data: {
          description: data.description,
          amount: data.amount,
          type: data.type,
          currentBalance: currentBalance + data.amount,
        },
      });
      return transaction;
    } else {
      const transaction = await this.prismaClient.transaction.create({
        data: {
          description: data.description,
          amount: data.amount,
          type: data.type,
          currentBalance: currentBalance - data.amount,
        },
      });
      return transaction;
    }
  }
}
