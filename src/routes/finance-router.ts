import { Router } from "express";
import {
  CreateTransactionController,
  UpdateTransactionController,
} from "../controller/index";
import { TransactionRepository } from "../repository/transaction.repository";
import {
  deleteTransaction,
  loadTransaction,
  loadBalance,
} from "../controller/finance-controller";

const Routes = Router();

const transactionRepository = new TransactionRepository();
const createTransactionController = new CreateTransactionController(
  transactionRepository
);
const updateTransactionController = new CreateTransactionController(
  transactionRepository
);
Routes.patch("/finance/:id", (req, res) => {
  updateTransactionController.handle(req, res);
});

Routes.post("/finance", (req, res) => {
  createTransactionController.handle(req, res);
});

Routes.delete("/finance/:id", deleteTransaction);
Routes.get("/finance/:startDate/:endDate", loadTransaction);
Routes.get("/balance", loadBalance);

export default Routes;
