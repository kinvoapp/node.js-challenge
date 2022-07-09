import { PrismaClient, Transaction } from "@prisma/client";
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
    currentBalance: number
  ): Promise<ICreateTransactionResponse> {
    return this.prismaClient.transaction.create({
      data: {
        ...data,
        currentBalance,
      },
    });
  }
}
