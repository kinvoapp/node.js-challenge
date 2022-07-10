import express from "express";
import TransactionController from "../controllers/transactionController";
const router = express.Router();

router
  .get("/transactions", TransactionController.getAllTransactions)
  .get(
    "/transactions/:beginDate/:endDate",
    TransactionController.getTransactionByDate
  )
  .get("/transactions/amount", TransactionController.getAmount)
  .post("/transactions", TransactionController.createTransaction)
  .patch("/transactions/:id", TransactionController.updateTransaction)
  .delete("/transactions/:id", TransactionController.deleteTransaction);

export default router;
