import { Expense } from "../interfaces/expense";
const { expenseModel } = require("../models/index.models");
const { expenseSchema } = require("./schemas");

exports.expenseCreateService = async (expense: Expense): Promise<object> => {
  const { error } = expenseSchema.validate(expense);

  if (error) return { code: 400, message: error.message };

  const expenses = await expenseModel.find();

  const newId = expense.id ? expense.id : expenses.length + 1;

  const { title, value, date, id } = await expenseModel.create({
    ...expense,
    id: newId,
  });

  return { title, value, date, id };
};

exports.expenseGetAllService = async (): Promise<object> => {
  const expenses = await expenseModel.find();

  return expenses;
};

exports.expenseGetByIdService = async (id: number): Promise<object> => {
  const expenses = await expenseModel.find({ id });

  return expenses;
};

exports.expenseSrcForDatesService = async (
  initialDate: string,
  finalDate: string
): Promise<object> => {
  const expenses = await expenseModel.find({
    date: {
      $gte: initialDate,
      $lte: finalDate,
    },
  });

  return expenses;
};

exports.expenseUpdateService = async (
  id: number,
  expense: object
): Promise<object> => {
  const updated = await expenseModel.findOneAndUpdate(id, expense);

  return updated;
};

exports.expenseDeleteService = async (id: number): Promise<object> => {
  const deleted = await expenseModel.deleteOne({ id });

  return deleted;
};
