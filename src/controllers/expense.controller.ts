import { Request, Response } from "express";

const {
  expenseCreateService,
  expenseGetAllService,
  expenseGetByIdService,
  expenseSrcForDatesService,
  expenseUpdateService,
  expenseDeleteService,
} = require("../services/expense.service");

exports.expenseCreate = async (req: Request, res: Response): Promise<any> => {
  let expenses;

  try {
    expenses = await expenseCreateService(req.body);
  } catch (error) {
    return res.status(500);
  }

  return expenses.code
    ? res.status(expenses.code).json(expenses.message)
    : res.status(201).json(expenses);
};

exports.expenseGetAll = async (_req: Request, res: Response): Promise<any> => {
  let expenses;
  try {
    expenses = await expenseGetAllService();
  } catch (error) {
    return res.status(500);
  }

  return expenses.code
    ? res.status(expenses.code).json(expenses.message)
    : res.status(200).json(expenses);
};

exports.expenseGetById = async (req: Request, res: Response): Promise<any> => {
  const {
    params: { id },
  } = req;

  let expense;
  try {
    expense = await expenseGetByIdService(id);
  } catch (error) {
    return res.status(500);
  }

  return expense.code
    ? res.status(expense.code).json(expense.message)
    : res.status(200).json(expense);
};

exports.expenseSearchForDates = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { initialDate, finalDate } = req.body;

  let expenses;
  try {
    expenses = await expenseSrcForDatesService(initialDate, finalDate);
  } catch (error) {
    return res.status(500);
  }

  return expenses.code
    ? res.status(expenses.code).json(expenses.message)
    : res.status(200).json(expenses);
};

exports.expenseUpdate = async (req: Request, res: Response): Promise<any> => {
  const {
    params: { id },
  } = req;
  try {
    const update = await expenseUpdateService(id, req.body);

    return res.status(200).json(update);
  } catch (error) {
    return res.status(500);
  }
};

exports.expenseDelete = async (req: Request, res: Response): Promise<any> => {
  const {
    params: { id },
  } = req;

  try {
    const deleted = await expenseDeleteService(id);

    return res.status(200).json(deleted);
  } catch (error) {
    return res.status(500);
  }
};
