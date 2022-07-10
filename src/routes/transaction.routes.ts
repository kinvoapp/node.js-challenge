import { Router } from "express";

import { TransactionsControllers } from "../controllers/Transaction.controller";

const transactionRoutes = Router();

const transactionsController = new TransactionsControllers();

transactionRoutes.post("/", transactionsController.createTransaction);

export default transactionRoutes;
