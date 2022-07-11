import Data from "../models";

const amountRevenue = () => {
  return Data.revenue.find();
};

const amountExpense = () => {
  return Data.expense.find();
};

const balanceAmount = () => {
  return Data.expense.find();
};

export default {
  amountRevenue,
  amountExpense,
  balanceAmount,
};
