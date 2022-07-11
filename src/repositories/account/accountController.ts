import { NextFunction, Response, Request } from 'express';

import { AccountService } from './accountService';

const accountService = new AccountService();

async function newAccountController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { name, cpf, password } = request.body;

    const newAccount = await accountService.register({ name, cpf, password });

    return response.status(201).json(newAccount);
  } catch (error) {
    next(error);
  }
}

async function loginAccountController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { cpf, password } = request.body;

    const login = await accountService.login({ cpf, password });

    return response.status(201).json(login);
  } catch (error) {
    next(error);
  }
}

export { newAccountController, loginAccountController };
