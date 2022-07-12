import { ICreateAccountDTO } from '../../infra/IAccountRepository';

import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user: ICreateAccountDTO;
    }
  }
}
