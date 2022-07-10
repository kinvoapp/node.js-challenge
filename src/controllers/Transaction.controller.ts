import { Request, Response } from "express";

export class TransactionsControllers {
  async createTransaction(req: Request, res: Response) {
    const entry = req.body?.entry;

    if (!entry) {
      return res.status(400).json({
        message: "Entry field was not provided",
      });
    }
  }
}
