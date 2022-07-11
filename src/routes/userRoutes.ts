import { Router } from 'express';
import { CreateUserController } from '../controllers/Users/CreateUserController';
import { GetAllUsersController } from '../controllers/Users/GetAllUsersController';
import { GetUserByIdController } from '../controllers/Users/GetUserByIdController';
import { LoginController } from '../controllers/Users/LoginController';
const routes = Router();

routes
  .get('/users/all', new GetAllUsersController().handle)
  .get('/users/:id', new GetUserByIdController().handle)
  .post('/users/new', new CreateUserController().handle)
  .post('/login', new LoginController().handle)

  export default routes;