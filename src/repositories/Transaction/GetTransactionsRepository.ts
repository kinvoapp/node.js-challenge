import { PrismaClient } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { IGetTransactionsRepository } from "../../domain/interface/repositories/Transaction/IGetTransactionsRepository";
import {
  ICreateTransactionResponse,
  ITransactionPaginationRequest,
  ITransactionPaginationResponse,
} from "../../domain/requestDto";

export class GetTransactionsRepository implements IGetTransactionsRepository {
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = prismaClient;
  }
  async getTransactions(
    accountId: string,
    filters: ITransactionPaginationRequest
  ): Promise<ICreateTransactionResponse[]> {
    const skipMultiplier =
      filters?.currentPage === 0 ? 1 : filters?.currentPage;
    const skipClause =
      filters.itemsPerPage && skipMultiplier
        ? filters?.itemsPerPage * skipMultiplier
        : undefined;
    const transactions = await this.prismaClient.transaction.findMany({
      where: {
        accountId,
        created_at: {
          gte: filters?.start,
          lte: filters?.end,
        },
      },
      select: {
        id: true,
        accountId: true,
        amount: true,
        description: true,
        type: true,
        currentBalance: true,
        created_at: true,
        updated_at: true,
      },
      orderBy: {
        created_at: "desc",
      },
      take: filters.itemsPerPage
        ? parseInt(filters.itemsPerPage.toString())
        : undefined,
      skip: skipClause,
    });
    return transactions;
  }
}
