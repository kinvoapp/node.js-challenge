import { Router } from "express";
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  loadTransaction,
  loadBalance,
} from "../controller/finance-controller";
const Routes = Router();

import { CreateTransactionController } from "../controller/CreateTransaction-controller";
import { TransactionRepository } from "../repository/transaction.repository";
const transactionRepository = new TransactionRepository();
const createTransactionController = new CreateTransactionController(
  transactionRepository
);
console.log(createTransactionController);
Routes.post("/finance", (req, res) => {
  createTransactionController.handle(req, res);
});

Routes.patch("/finance/:id", updateTransaction);
Routes.delete("/finance/:id", deleteTransaction);
Routes.get("/finance/:startDate/:endDate", loadTransaction);
Routes.get("/balance", loadBalance);

export default Routes;
