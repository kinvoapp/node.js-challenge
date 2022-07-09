import "reflect-metadata";
import { DataSource } from "typeorm";
import { TransactionHistory } from "./entities/transactionHistory.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  password: "123",
  username: "root",
  database: "mini_bank",
  synchronize: false,
  logging: false,
  entities: [TransactionHistory],
  subscribers: [],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
});

export const TransactionHistoryRepository =
  AppDataSource.getRepository(TransactionHistory);
