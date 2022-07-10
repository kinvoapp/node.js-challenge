import Data from "../models";
import { Request } from "express";

const updateDataRevenue = (req: Request) => {
  return Data.revenue.findByIdAndUpdate(req.params.id, req.body);
};

const updateDataExpense = (req: Request) => {
  return Data.expense.findByIdAndUpdate(req.params.id, req.body);
};

export default {
  updateDataRevenue,
  updateDataExpense,
};
