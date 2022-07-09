import { PrismaClient } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { IGetTransactionRepository } from "../../domain/interface/repositories/Transaction/IGetTransactionRepository";
import { ICreateTransactionResponse } from "../../domain/requestDto";
import { buildTransactionSelect } from "../Helpers/selectBuilder";

export class GetTransactionRepository implements IGetTransactionRepository {
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = prismaClient;
  }
  getTransaction(
    id: string,
    accountId: string
  ): Promise<ICreateTransactionResponse | null> {
    return this.prismaClient.transaction.findFirst({
      select: buildTransactionSelect(),
      where: {
        id,
        accountId,
      },
    });
  }
}
