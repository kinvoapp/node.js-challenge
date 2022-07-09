import { Request, Response } from "express";
import {
  ICreateTransactionResponse,
  RequestWithStudentInfo,
} from "../../domain/requestDto";
import { FindAccountByIdRepository } from "../../repositories/Account/FindAccountByIdRepository";
import { CreateTransactionRepository } from "../../repositories/Transaction/CreateTransactionRepository";
import { GetCurrentBalanceRepository } from "../../repositories/Transaction/GetCurrentBalanceRepository";
import { CreateTransactionService } from "../../services/Transaction/CreateTransactionService";

export class CreateTransactionController {
  async handle(request: Request, response: Response) {
    const { amount, description, type }: ICreateTransactionResponse =
      request.body;
    const { accountId } = request as RequestWithStudentInfo;
    const createTransactionService = new CreateTransactionService(
      new CreateTransactionRepository(),
      new GetCurrentBalanceRepository(),
      new FindAccountByIdRepository()
    );

    const transaction: ICreateTransactionResponse =
      await createTransactionService.execute({
        accountId,
        amount,
        description,
        type,
      });

    return response.json(transaction);
  }
}
