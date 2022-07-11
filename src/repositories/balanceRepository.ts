import { AppDataSource } from "../data-source";
import { Balance } from "../entities/Balance";

export const balanceRepository = AppDataSource.getRepository(Balance);