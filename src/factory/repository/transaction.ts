import {
  CreateTransactionDto,
  FindTransactionDto,
  UpdateTransactionDto,
} from "@/internal/dto/transaction";
import { transaction } from "@prisma/client";

export interface TransactionRepository {
  create: (data: CreateTransactionDto) => Promise<transaction>;
  find: (data?: FindTransactionDto) => Promise<transaction[]>;
  findOne: (id: string) => Promise<transaction | null>;
  update: (id: string, data: UpdateTransactionDto) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

export default function transactionRepositoryFactory(
  repositoryMethods: TransactionRepository,
): TransactionRepository {
  return {
    create: repositoryMethods.create,
    find: repositoryMethods.find,
    findOne: repositoryMethods.findOne,
    update: repositoryMethods.update,
    delete: repositoryMethods.delete,
  };
}
