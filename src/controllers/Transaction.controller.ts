import { Request, Response } from "express";
import { CreateTransactionDto } from "../dto/Transaction.dto";
import { transactionHistoryRepository } from "../repositories/transactionHistory.repository";

export class TransactionsControllers {
  async createTransaction(req: Request, res: Response) {
    const { entry } = req.body as CreateTransactionDto;

    const transaction = transactionHistoryRepository.create({
      entry,
    });

    const transactionCreated = await transactionHistoryRepository.save(
      transaction
    );

    return res.json(transactionCreated);
  }
}
