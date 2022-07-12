import { Router } from 'express';
import { tokenGuard } from '../middlewares/tokenGuard';
import {
  createTransactionController,
  listTransactionsController,
  removeTransactionController,
  updateTransactionController,
} from '../repositories/transactions/transactionController';
const transactionRouter = Router();

transactionRouter.get('/', tokenGuard, listTransactionsController);
transactionRouter.post('/', tokenGuard, createTransactionController);
transactionRouter.put('/:id', tokenGuard, removeTransactionController);
transactionRouter.delete('/:id', tokenGuard, updateTransactionController);

export { transactionRouter };
