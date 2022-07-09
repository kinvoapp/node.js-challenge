import { Request, Response } from "express";
import {
  IBalanceResponse,
  RequestWithStudentInfo,
} from "../../domain/requestDto";
import { GetAccountWithBalanceRepository } from "../../repositories/Account/GetAccountWithBalanceRepository.ts";
import { GetAccountBalanceService } from "../../services/Account/GetAccountBalanceService";

export class GetAccountBalanceController {
  async handle(request: Request, response: Response) {
    const { accountId } = request as RequestWithStudentInfo;
    const getCurrentBalanceService = new GetAccountBalanceService(
      new GetAccountWithBalanceRepository()
    );
    const currentBalance = await getCurrentBalanceService.execute(accountId);

    const balanceResponse: IBalanceResponse = {
      studentId: currentBalance.studentId,
      available: currentBalance.available,
      updatedAt: currentBalance.balanceUpdatedAt,
    };

    return response.json(balanceResponse);
  }
}
