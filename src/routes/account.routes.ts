import { Router } from 'express';
import {
  getBalance,
  loginAccountController,
  newAccountController,
} from '../repositories/account/accountController';

const routerAccount = Router();

routerAccount.post('/', newAccountController);
routerAccount.post('/login', loginAccountController);
routerAccount.get('/balance', getBalance);

export { routerAccount };
