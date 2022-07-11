import Data from "../models";

const calcBalance = async () => {
  const balanceRevenues = await Data.revenue.aggregate([
    {
      $group: {
        _id: null,
        value: {
          $sum: "$value",
        },
      },
    },
  ]);

  const balanceExpenses = await Data.expense.aggregate([
    {
      $group: {
        _id: null,
        value: {
          $sum: "$value",
        },
      },
    },
  ]);

  const balance = balanceRevenues[0].value - balanceExpenses[0].value;

  return { balance };
};

export default calcBalance;
