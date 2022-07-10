import { Request, Response } from "express";
import {
  IUpdateTransactionData,
  RequestWithStudentInfo,
} from "../../domain/requestDto";
import { GetAccountWithBalanceRepository } from "../../repositories/Account/GetAccountWithBalanceRepository";
import { GetTransactionRepository } from "../../repositories/Transaction/GetTransactionRepository";
import { UpdateTransactionRepository } from "../../repositories/Transaction/UpdateTransactionRepository";
import { UpdateTransactionService } from "../../services/Transaction/UpdateTransactionService";

export class UpdateTransactionsController {
  async handle(request: Request, response: Response) {
    const data: IUpdateTransactionData = request.body;
    const { transactionId } = request.params;
    const { accountId } = request as RequestWithStudentInfo;
    const updateTransactionService = new UpdateTransactionService(
      new UpdateTransactionRepository(),
      new GetTransactionRepository(),
      new GetAccountWithBalanceRepository()
    );
    const updatedTransaction = await updateTransactionService.execute(
      transactionId,
      accountId,
      data
    );

    return response.json(updatedTransaction);
  }
}
