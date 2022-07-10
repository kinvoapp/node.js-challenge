import Data from "../models";
import { Request } from "express";

const getAllDataExpense = (req: Request) => {
  return Data.expense.find({});
};

const getAllDataRevenue = (req: Request) => {
  return Data.revenue.find({});
};

export default {
  getAllDataExpense,
  getAllDataRevenue,
};
