import { Request, Response } from "express";
import { RequestWithStudentInfo } from "../../domain/requestDto";
import { GetAccountWithBalanceRepository } from "../../repositories/Account/GetAccountWithBalanceRepository";
import { DeleteTransactionRepository } from "../../repositories/Transaction/DeleteTransactionRepository";
import { GetTransactionRepository } from "../../repositories/Transaction/GetTransactionRepository";
import { DeleteTransactionService } from "../../services/Transaction/DeleteTransactionService";

export class DeleteTransactionController {
  async handle(request: Request, response: Response) {
    const { transactionId } = request.params;
    const { accountId } = request as RequestWithStudentInfo;
    const deleteTransactionService = new DeleteTransactionService(
      new GetTransactionRepository(),
      new DeleteTransactionRepository(),
      new GetAccountWithBalanceRepository()
    );
    await deleteTransactionService.execute(transactionId, accountId);

    return response.json();
  }
}
