import { Router } from 'express';
import {
  loginAccountController,
  newAccountController,
} from '../repositories/account/accountController';

const router = Router();

router.post('/account', newAccountController);
router.post('/login', loginAccountController);

export { router };
