import express from "express";
import TransactionController from "../controllers/transactionController";
const router = express.Router();

router
  .get("/transactions", TransactionController.getAllTransactions)
  .get("/transactions/:id", TransactionController.getTransactionById)
  .post("transactions", TransactionController.createTransaction)
  .put("transactions/:id", TransactionController.updateTransaction)
  .delete("transactions/:id, TransactionController.deleteTransaction");

export default router;
