import express from "express";
import controller from "../controllers";
const router = express.Router();

router
  .get("/revenue", controller.revenueController.getAllRevenues)
  .get(
    "/revenue/:beginDate/:endDate",
    controller.revenueController.getRevenueByDate
  )
  .get("/revenue/amount", controller.revenueController.getAmount)
  .post("/revenue", controller.revenueController.createRevenue)
  .patch("/revenue/:id", controller.revenueController.updateRevenue)
  .delete("/revenue/:id", controller.revenueController.deleteRevenue)

  .get("/expense", controller.expenseController.getAllExpenses)
  .get(
    "/expense/:beginDate/:endDate",
    controller.expenseController.getExpenseByDate
  )
  .get("/expense/amount", controller.expenseController.getAmount)
  .post("/expense", controller.expenseController.createExpense)
  .patch("/expense/:id", controller.expenseController.updateExpense)
  .delete("/expense/:id", controller.expenseController.deleteExpense)

  .get("/balance", controller.balanceController.getBalanceAmount);
export default router;
