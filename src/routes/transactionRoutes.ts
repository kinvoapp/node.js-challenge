import { Router } from 'express';
import { CreateTransactionController } from '../controllers/Transactions/CreateTransactionController';
import { DeleteTransactionController } from '../controllers/Transactions/DeleteTransactionController';
import { GetAllTransactionsByUserController } from '../controllers/Transactions/GetAllTransactionsByUserController';
import { GetTransactionsByDateController } from '../controllers/Transactions/GetTransactionsByDateController';
import { UpdateTransactionController } from '../controllers/Transactions/UpdateTransactionController';
import { GetBalanceController } from '../controllers/Transactions/GetBalanceController';
import AuthMiddleware from '../middlewares/auth';
const routes = Router();

routes
  .get('/transactions/all', AuthMiddleware, new GetAllTransactionsByUserController().handle)
  .get('/transactions', AuthMiddleware, new GetTransactionsByDateController().handle)
  .get('/transactions/balance', AuthMiddleware, new GetBalanceController().handle)
  .post('/transactions/new', AuthMiddleware, new CreateTransactionController().handle)
  .put('/transactions/update/:id', AuthMiddleware, new UpdateTransactionController().handle)
  .delete('/transactions/delete/:id', AuthMiddleware, new DeleteTransactionController().handle)

  export default routes;