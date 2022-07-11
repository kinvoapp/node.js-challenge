import { Repository } from "typeorm";
import { TransactionHistory } from "../infra/database/entities/transactionHistory.entity";
import { AppDataSource } from "../infra/database/typeorm.connection";

export const TransactionHistoryRepository =
  AppDataSource.getRepository(TransactionHistory);
