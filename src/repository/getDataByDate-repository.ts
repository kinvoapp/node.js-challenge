import Data from "../models";
import { Request } from "express";

const getDataRevenue = (req: Request) => {
  const { beginDate, endDate } = req.params;

  return Data.revenue.find({
    createdAt: {
      $gte: `${beginDate}T00:00:00.000Z`,
      $lt: `${endDate}T23:59:59.999Z`,
    },
  });
};

const getDataExpense = (req: Request) => {
  const { beginDate, endDate } = req.params;

  return Data.expense.find({
    createdAt: {
      $gte: `${beginDate}T00:00:00.000Z`,
      $lt: `${endDate}T23:59:59.999Z`,
    },
  });
};

export default {
  getDataRevenue,
  getDataExpense,
};
