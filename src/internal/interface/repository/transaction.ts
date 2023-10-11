import {
  CreateTransactionDto,
  FindCountDto,
  FindTransactionDto,
  UpdateTransactionDto,
} from "@/internal/dto/transaction";
import { transaction } from "@prisma/client";

export interface TransactionRepository {
  create: (data: CreateTransactionDto) => Promise<transaction>;
  find: (data?: FindTransactionDto) => Promise<transaction[]>;
  findCount: (data: FindCountDto) => Promise<number>;
  findOne: (id: string) => Promise<transaction | null>;
  update: (id: string, data: UpdateTransactionDto) => Promise<transaction>;
  delete: (id: string) => Promise<transaction>;
}
