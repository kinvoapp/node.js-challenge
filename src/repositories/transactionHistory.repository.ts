import { TransactionHistory } from "../infra/database/entities/transactionHistory.entity";
import { AppDataSource } from "../infra/database/typeorm.connection";

export const transactionHistoryRepository =
  AppDataSource.getRepository(TransactionHistory);
