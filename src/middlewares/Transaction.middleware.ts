import { NextFunction, Request, Response } from "express";

import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from "../dto/Transaction.dto";

export class TransactionsMiddlewares {
  validateCreateTransactionDTO(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { entry } = req.body as CreateTransactionDto;

    if (!entry) {
      return res.status(400).json({
        message: "Entry field was not provided!",
      });
    }

    if (typeof entry !== "number") {
      return res.status(400).json({
        message: "Entry field should be number!",
      });
    }

    next();
  }

  validateUpdateTransactionDTO(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { entry } = req.body as UpdateTransactionDto;

    if (!entry) {
      return res.status(400).json({
        message: "Entry field was not provided!",
      });
    }

    if (typeof entry !== "number") {
      return res.status(400).json({
        message: "Entry field should be number!",
      });
    }
    if (
      isNaN(Number(req.params.id)) ||
      typeof Number(req.params.id) !== "number"
    ) {
      return res.status(400).json({
        message: "Id param should be number!",
      });
    }

    next();
  }

  validateDeleteTransactionDTO(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (
      isNaN(Number(req.params.id)) ||
      typeof Number(req.params.id) !== "number"
    ) {
      return res.status(400).json({
        message: "Id param should be number!",
      });
    }

    next();
  }
}
