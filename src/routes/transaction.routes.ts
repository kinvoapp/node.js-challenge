import { Router } from "express";

import { TransactionsControllers } from "../controllers/Transaction.controller";
import { TransactionsMiddlewares } from "../middlewares/Transaction.middleware";

const transactionRoutes = Router();

const transactionsController = new TransactionsControllers();
const transactionsMiddlewares = new TransactionsMiddlewares();

transactionRoutes.post(
  "/",
  transactionsMiddlewares.validateCreateTransactionDTO,
  transactionsController.createTransaction
);

export default transactionRoutes;
