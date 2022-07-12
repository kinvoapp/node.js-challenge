import { NextFunction, Response, Request } from 'express';
import { TransactionService } from './transactionService ';

const transactionService = new TransactionService();

async function createTransactionController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { description, type, value } = request.body;
    // const { id } = request.user;
    const id = 1;

    const newAccount = await transactionService.create({
      accountId: id,
      description,
      type,
      value,
    });

    return response.status(201).json(newAccount);
  } catch (error) {
    next(error);
  }
}

async function updateTransactionController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { description } = request.body;
    const { id } = request.params;

    await transactionService.update(+id, description);

    return response.status(200).send();
  } catch (error) {
    next(error);
  }
}

async function removeTransactionController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { id } = request.params;

    await transactionService.remove(+id);

    return response.status(200).send();
  } catch (error) {
    next(error);
  }
}

async function listTransactionsController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // const { id } = request.user;
    const id = 1;

    const transactions = await transactionService.list(id);

    return response.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
}

export {
  createTransactionController,
  updateTransactionController,
  listTransactionsController,
  removeTransactionController,
};
