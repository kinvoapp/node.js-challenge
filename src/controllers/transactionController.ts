import { Request, Response } from "express";
import Transaction from "../models/transaction";
import { ITransaction } from "../types/ITransaction";

const TransactionController = {
  async getAllTransactions(req: Request, res: Response) {
    Transaction.find({}, (err: Error, transaction: ITransaction) => {
      if (err) {
        res.send(err);
      }
      res.json(transaction);
    });
  },

  async getTransactionById(req: Request, res: Response) {
    Transaction.findById(
      req.params.id,
      (err: Error, transaction: ITransaction) => {
        if (err) {
          res.status(404).send(err);
        }
        res.json(transaction);
      }
    );
  },

  async createTransaction(req: Request, res: Response) {
    let newTransaction = new Transaction(req.body);

    newTransaction.save((err, transaction) => {
      if (err) {
        res.status(404).send(err);
      }
      res.json(transaction);
    });
  },

  async updateTransaction(req: Request, res: Response) {
    Transaction.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, transaction) => {
        if (err) {
          res.send(err);
        }
        res.json(transaction);
      }
    );
  },

  async deleteTransaction(req: Request, res: Response) {
    Transaction.remove({ _id: req.params.id }, (err: Error) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Successfully deleted transaction" });
    });
  },
};

export default TransactionController;
