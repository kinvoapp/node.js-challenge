import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

const jestOptions: DataSourceOptions = {
  type: "sqlite",
  database: ":memory:",
  entities: [`${__dirname}/entities/*.entity.{ts,js}`],
  synchronize: true,
};

const devOptions: DataSourceOptions = {
  type: "mysql",
  host: "db",
  port: 3306,
  password: "123",
  username: "root",
  database: "mini_bank",
  synchronize: false,
  logging: false,
  entities: [`${__dirname}/entities/*.entity.{ts,js}`],
  subscribers: [],
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
};

export const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test" ? jestOptions : devOptions
);
