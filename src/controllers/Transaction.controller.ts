import { Request, Response } from "express";
import { Between, FindManyOptions, LessThan, MoreThan } from "typeorm";

import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from "../dto/Transaction.dto";
import { TransactionHistoryRepository } from "../repositories/transactionHistory.repository";

export class TransactionsControllers {
  async createTransaction(req: Request, res: Response) {
    const { entry, created_at } = req.body as CreateTransactionDto;

    let transactionObject: CreateTransactionDto = {
      entry,
    };
    if (created_at) {
      transactionObject["created_at"] = created_at;
    }

    const transaction = TransactionHistoryRepository.create(transactionObject);

    const transactionCreated = await TransactionHistoryRepository.save(
      transaction
    );

    return res.json(transactionCreated);
  }

  async updateTransaction(req: Request, res: Response) {
    const { entry, created_at } = req.body as UpdateTransactionDto;

    const transactionToUpdate = await TransactionHistoryRepository.findOneBy({
      id: Number(req.params.id),
    });

    if (!transactionToUpdate) {
      return res.status(404).json({ message: "Transaction was not found" });
    }

    transactionToUpdate.entry = entry;

    transactionToUpdate.created_at =
      created_at || transactionToUpdate?.created_at;

    const updateTransaction = await TransactionHistoryRepository.save(
      transactionToUpdate
    );

    return res.status(201).send(updateTransaction);
  }

  async deleteTransaction(req: Request, res: Response) {
    const transactionToDelete = await TransactionHistoryRepository.findOneBy({
      id: Number(req.params.id),
    });

    if (!transactionToDelete) {
      return res.status(404).json({ message: "Transaction was not found" });
    }

    await TransactionHistoryRepository.delete({
      id: Number(req.params.id),
    });

    return res.status(204).json({
      ok: true,
    });
  }

  async getAllTransaction(req: Request, res: Response) {
    const { initalDate, finalDate, page } = req.query as {
      initalDate: string;
      finalDate: string;
      page: string;
    };

    let options: FindManyOptions = {};

    if (page) {
      const resultsNumber = 5;
      options["take"] = resultsNumber;
      options["skip"] = (Number(page) - 1) * resultsNumber;
    }

    if (initalDate && finalDate) {
      if (new Date(initalDate) > new Date(finalDate)) {
        return res.status(400).json({
          message: "Inital Date is greater than the final Date",
        });
      }
      options["where"] = { created_at: Between(initalDate, finalDate) };
    } else if (initalDate) {
      options["where"] = { created_at: MoreThan(initalDate) };
    } else if (finalDate) {
      options["where"] = { created_at: LessThan(finalDate) };
    }

    const transactions = await TransactionHistoryRepository.find(options);

    return res.status(200).json(transactions);
  }

  async getOneTransaction(req: Request, res: Response) {
    const transaction = await TransactionHistoryRepository.findOneBy({
      id: Number(req.params.id),
    });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction was not found" });
    }

    return res.status(200).json(transaction);
  }

  async getBalance(req: Request, res: Response) {
    const transaction = await TransactionHistoryRepository.find();

    const totalBalance = transaction.reduce(
      (before, after) => before + after.entry,
      0
    );

    return res.status(200).json({ totalBalance });
  }
}
