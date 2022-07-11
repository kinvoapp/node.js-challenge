const { revenueModel, expenseModel } = require("../models/index.models");

exports.getBalanceService = async (): Promise<object> => {
  const sumRevenues = await revenueModel.aggregate([
    {
      $group: {
        _id: null,
        value: {
          $sum: "$value",
        },
      },
    },
  ]);

  const sumExpenses = await expenseModel.aggregate([
    {
      $group: {
        _id: null,
        value: {
          $sum: "$value",
        },
      },
    },
  ]);

  const balance = sumRevenues[0].value - sumExpenses[0].value;

  return { balance };
};
