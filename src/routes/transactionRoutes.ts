import { Router } from 'express';
import { CreateTransactionController } from '../controllers/Transactions/CreateTransactionController';
import AuthMiddleware from '../middlewares/auth';
const routes = Router();

routes
  // .get('/users/all', new GetAllUsersController().handle)
  // .get('/users/:id', new GetUserByIdController().handle)
  .post('/transactions/new', AuthMiddleware, new CreateTransactionController().handle)
  // .post('/login', new LoginController().handle)

  export default routes;