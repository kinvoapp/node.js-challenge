import { Request, Response } from "express";
import { RequestWithStudentInfo } from "../../domain/requestDto";
import { FindAccountByIdRepository } from "../../repositories/Account/FindAccountByIdRepository";
import { GetCurrentBalanceRepository } from "../../repositories/Transaction/GetCurrentBalanceRepository";
import { GetAccountBalanceService } from "../../services/Transaction/GetAccountBalanceService";

export class GetAccountBalanceController {
  async handle(request: Request, response: Response) {
    const { accountId } = request as RequestWithStudentInfo;
    const getCurrentBalanceService = new GetAccountBalanceService(
      new GetCurrentBalanceRepository(),
      new FindAccountByIdRepository()
    );
    const currentBalance = await getCurrentBalanceService.execute(accountId);

    return response.json({ currentBalance });
  }
}
