import { Request, Response } from "express";
import {
  ITransactionPaginationRequest,
  RequestWithStudentInfo,
} from "../../domain/requestDto";
import { FindAccountByIdRepository } from "../../repositories/Account/FindAccountByIdRepository";
import { GetTransactionsRepository } from "../../repositories/Transaction/GetTransactionsRepository";
import { GetTransactionsService } from "../../services/Transaction/GetTransactionsService";

export class GetTransactionsController {
  async handle(request: Request, response: Response) {
    const { accountId } = request as RequestWithStudentInfo;
    const filters: ITransactionPaginationRequest = request.query;
    const getTransactionsService = new GetTransactionsService(
      new GetTransactionsRepository(),
      new FindAccountByIdRepository()
    );
    const transactions = await getTransactionsService.execute(
      accountId,
      filters
    );

    return response.json(transactions);
  }
}
