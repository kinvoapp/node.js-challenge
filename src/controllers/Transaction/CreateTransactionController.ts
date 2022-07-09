import { Request, Response } from "express";
import {
  ICreateTransactionRequest,
  ICreateTransactionResponse,
  RequestWithStudentInfo,
} from "../../domain/requestDto";
import { CreateTransactionRepository } from "../../repositories/Transaction/CreateTransactionRepository";
import { GetAccountWithBalanceRepository } from "../../repositories/Account/GetAccountWithBalanceRepository";
import { CreateTransactionService } from "../../services/Transaction/CreateTransactionService";

export class CreateTransactionController {
  async handle(request: Request, response: Response) {
    const data: ICreateTransactionRequest = request.body;
    const { accountId } = request as RequestWithStudentInfo;
    const createTransactionService = new CreateTransactionService(
      new CreateTransactionRepository(),
      new GetAccountWithBalanceRepository()
    );

    const transaction: ICreateTransactionResponse =
      await createTransactionService.execute(data, accountId);

    return response.json(transaction);
  }
}
