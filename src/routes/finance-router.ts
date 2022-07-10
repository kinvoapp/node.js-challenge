import { Router } from "express";
import {
  CreateTransactionController,
  UpdateTransactionController,
  DeleteTransactionController,
  LoadTransactionController,
} from "../controller/index";
import { TransactionRepository } from "../repository/transaction.repository";
import { loadTransaction, loadBalance } from "../controller/finance-controller";

const Routes = Router();

const transactionRepository = new TransactionRepository();
const createTransactionController = new CreateTransactionController(
  transactionRepository
);
const updateTransactionController = new UpdateTransactionController(
  transactionRepository
);
const deleteTransactionController = new DeleteTransactionController(
  transactionRepository
);

const loadTransactionController = new LoadTransactionController(
  transactionRepository
);
Routes.patch("/finance/:id", (req, res) => {
  updateTransactionController.handle(req, res);
});

Routes.post("/finance", (req, res) => {
  createTransactionController.handle(req, res);
});

Routes.delete("/finance/:id", (req, res) => {
  deleteTransactionController.handle(req, res);
});

Routes.get("/finance/:startDate/:endDate", (req, res) => {
  loadTransactionController.handle(req, res);
});
Routes.get("/balance", loadBalance);

export default Routes;
