import { Request, Response, NextFunction } from "express";
import {
  saveData,
  getData,
  getAllData,
  updateData,
  deleteData,
  amount,
} from "../repository";
import { calculate } from "../utils/calcAmount";

const ExpenseController = {
  async getAllExpenses(req: Request, res: Response, next: NextFunction) {
    getAllData
      .getAllDataExpense(req)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  },

  async getExpenseByDate(req: Request, res: Response, next: NextFunction) {
    getData
      .getDataExpense(req)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  },

  async createExpense(req: Request, res: Response, next: NextFunction) {
    saveData
      .saveDataExpense(req)
      .then((data) => {
        return res.status(201).json(data);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  },

  async updateExpense(req: Request, res: Response) {
    updateData
      .updateDataExpense(req)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  },

  async deleteExpense(req: Request, res: Response) {
    deleteData
      .deleteExpense(req)
      .then(() => {
        return res.status(200).json({ message: "Data deleted successfully" });
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  },

  async getAmount(req: Request, res: Response, next: NextFunction) {
    amount.amountExpense().then((data) => {
      res.status(200).json({ balance: calculate(data) });
    });
  },
};

export default ExpenseController;
