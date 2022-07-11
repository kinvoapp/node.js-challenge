import { Expense } from "../entities/Expense";
import { AppDataSource } from "../data-source";

export const expenseRepository = AppDataSource.getRepository(Expense);