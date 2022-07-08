import { Transaction } from "@prisma/client";
import { ICreateTransactionRequest } from "../../../requestDto";

export interface ICreateTransactionRepository {
  createTransaction(
    data: ICreateTransactionRequest,
    currentBalance: number
  ): Promise<Transaction>;
}
