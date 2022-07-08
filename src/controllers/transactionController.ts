import { Response } from "express";
const { v4: uuid } = require("uuid"); //todo check import
import Transaction from "../models/transaction";

export = {
  async index(req: Request, res: Response) {
    try {
      const transactions = await Transaction.find();
      return res.status(200).json({ transactions });
    } catch (err) {
      return res.status(400).json({}); // TODO check error catch
    }
  },
  async store(req: Request, res: Response) {
    const { title, value } = req.body;

    if (!title || !value) {
      return res.status(400).json({ err: "Title and value are required" });
    }
    const transaction = new Transaction({
      _id: uuid(),
      title,
      value,
      created_datetime: new Date(),
    });
    try {
      await transaction.save();
      return res.status(201).json({ transaction });
    } catch (err) {
      return res.status(400).json({}); // TODO check error catch
    }
  },

  async update(req: Request, res: Response) {
    const { title, value } = req.body;

    if (!title && !value) {
      return res.status(400).json({ error: "Title and value are required" });
    }
    if (title) res.transaction.title = title;
    if (value) res.transaction.value = value;

    try {
      await res.transaction.save();
      return res.status(200).json({ transaction: res.transaction });
    } catch (error) {
      return res.status(500).json({}); // TODO check
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await res.transaction.remove();
      return res.status(204).json({ message: "Transaction deleted" });
    } catch (error) {
      return res.status(500).json({}); // TODO check
    }
  },
};
