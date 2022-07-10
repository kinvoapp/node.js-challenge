import { Router } from "express";
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  loadTransaction,
  loadBalance,
} from "../controller/finance-controller";
const Routes = Router();

Routes.post("/finance", addTransaction);
Routes.patch("/finance/:id", updateTransaction);
Routes.delete("/finance/:id", deleteTransaction);
Routes.get("/finance/:startDate/:endDate", loadTransaction);
Routes.get("/balance", loadBalance);

export default Routes;
