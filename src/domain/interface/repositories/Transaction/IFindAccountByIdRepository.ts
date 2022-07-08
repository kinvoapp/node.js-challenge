import { Transaction } from "@prisma/client";

export interface ICreateTransactionRepository {
  findAccountById(id: string): Promise<Transaction | null>;
}
