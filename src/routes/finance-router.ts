import { Router } from "express";
import {
  CreateTransactionController,
  UpdateTransactionController,
  DeleteTransactionController,
  LoadTransactionController,
  GetBalanceController,
} from "../controller/index";
import { TransactionRepository } from "../repository/transaction.repository";

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
const getBalance = new GetBalanceController(transactionRepository);
Routes.patch("/finance/:id", (req, res) => {
  updateTransactionController.handle(req, res);
});

Routes.post("/finance", (req, res) => {
  createTransactionController.handle(req, res);
});

Routes.delete("/finance/:id", (req, res) => {
  deleteTransactionController.handle(req, res);
});

Routes.get("/finance/:startDate/:endDate/:limit?", (req, res) => {
  loadTransactionController.handle(req, res);
});
Routes.get("/balance", (req, res) => {
  getBalance.handle(req, res);
});

export default Routes;
