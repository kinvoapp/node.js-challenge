import { Request, Response, NextFunction } from "express";
import Transaction from "../models/transaction";
import {
  saveData,
  getData,
  getAllData,
  updateData,
  deleteData,
  amount,
} from "../repository";
// import ITransaction from "../types/ITransaction";
import { calculate } from "../utils/calcAmount";

const TransactionController = {
  async getAllTransactions(req: Request, res: Response, next: NextFunction) {
    getAllData(req)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });

    // Transaction.find({}, (err: Error, transaction: ITransaction) => {
    //   if (err) {
    //     res.send(err);
    //   }
    //   res.json(transaction);
    // });
  },

  async getTransactionByDate(req: Request, res: Response, next: NextFunction) {
    getData(req)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  },

  async createTransaction(req: Request, res: Response, next: NextFunction) {
    saveData(req)
      .then((data) => {
        return res.status(201).json(data);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  },

  async updateTransaction(req: Request, res: Response) {
    updateData(req)
      .then((data) => {
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  },

  async deleteTransaction(req: Request, res: Response) {
    deleteData(req)
      .then(() => {
        return res.status(200).json({ message: "Data deleted successfully" });
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  },

  async getAmount(req: Request, res: Response, next: NextFunction) {
    amount().then((data) => {
      res.status(200).json({ balance: calculate(data) });
    });
  },
};

export default TransactionController;
