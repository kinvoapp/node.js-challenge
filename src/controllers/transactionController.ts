import { Request, Response } from "express";
const { v4: uuid } = require("uuid"); //todo check import
import Transaction from "../models/transaction";
import { ITransaction } from "../types/transaction";

const TransactionController = {
  async getAllTransactions(req: Request, res: Response) {
    try {
      const transactions = await Transaction.find();
      return res.status(200).json({ transactions });
    } catch (err) {
      return res.status(400).json(err);
    }
  },

  async getTransactionById(req: Request, res: Response) {
    const { id } = req.params;
    await Transaction.findById(id, function (err: Error, Transaction: {}) {
      if (err) {
        res.status(400).send({ message: `${err.message} - Not Found` });
      }
      res.status(200).send(Transaction);
    });
  },

  async createTransaction(req: Request, res: Response) {
    const { title, value }: ITransaction = req.body;
    if (!title || value) {
      return res.status(400).json({ err: "Title and Value are Required" });
    }
    const transaction = new Transaction({
      _id: uuid.v4(),
      title,
      value,
      created_datetime: new Date(),
    });
    try {
      await transaction.save();
      return res.status(201).json({ transaction });
    } catch (err) {
      return res.status(400).json({ err: err });
    }
  },

  async updateTransaction(req: Request, res: Response) {
    const { id } = req.params;
    const { title, value } = req.body;

    await Transaction.findByIdAndUpdate(id, {
      title: title,
      value: value,
    })
      .then((data) => {
        return res.json(data);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
    return res.status(500);
  },

  async deleteTransaction(req: Request, res: Response) {
    const { id } = req.params;

    await Transaction.findByIdAndDelete(id)
      .then((data) => {
        return res.json({ message: `${id} excluido com sucesso!` });
      })
      .catch((err) => {
        return res.status(400).json(err.message);
      });
    return res.status(500);
  },
};

export default TransactionController;
