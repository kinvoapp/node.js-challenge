import Data from "../models";
import { Request } from "express";

const deleteExpense = (req: Request) => {
  return Data.expense.findByIdAndDelete(req.params.id);
};

const deleteRevenue = (req: Request) => {
  return Data.revenue.findByIdAndDelete(req.params.id);
};

export default {
  deleteExpense,
  deleteRevenue,
};
