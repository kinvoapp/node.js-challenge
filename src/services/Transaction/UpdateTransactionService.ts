import { InvalidArgument, NotFound } from "../../domain/error";
import { IGetAccountWithBalanceRepository } from "../../domain/interface/repositories/Account/IGetAccountWithBalanceRepository";
import { IGetTransactionRepository } from "../../domain/interface/repositories/Transaction/IGetTransactionRepository";
import { IUpdateTransactionRepository } from "../../domain/interface/repositories/Transaction/IUpdateTransactionRepository";
import {
  IBalanceInfo,
  ICreateTransactionResponse,
  IUpdateTransactionData,
} from "../../domain/requestDto";
import { GetAccountBalanceService } from "../Account/GetAccountBalanceService";

export class UpdateTransactionService {
  private updateTransactionRepository: IUpdateTransactionRepository;
  private getTransactionRepository: IGetTransactionRepository;
  private getAccountWithBalanceRepository: IGetAccountWithBalanceRepository;

  constructor(
    updateTransactionRepository: IUpdateTransactionRepository,
    getTransactionRepository: IGetTransactionRepository,
    getAccountWithBalanceRepository: IGetAccountWithBalanceRepository
  ) {
    this.updateTransactionRepository = updateTransactionRepository;
    this.getTransactionRepository = getTransactionRepository;
    this.getAccountWithBalanceRepository = getAccountWithBalanceRepository;
  }

  async execute(
    transactionId: string,
    accountId: string,
    data: IUpdateTransactionData
  ) {
    const getAccountBalanceService = new GetAccountBalanceService(
      this.getAccountWithBalanceRepository
    );
    const account = await getAccountBalanceService.execute(accountId);
    const transaction = await this.getTransactionRepository.getTransaction(
      transactionId,
      account.id
    );
    if (!transaction) {
      throw new NotFound("Transaction doesn't exist");
    }

    const updatedTransaction =
      await this.updateTransactionRepository.updateTransaction(
        transaction.id,
        data,
        this.buildBalanceInfo(
          account.available,
          data,
          account.balanceId,
          transaction
        )
      );
  }

  private buildBalanceInfo(
    currentBalance: number,
    data: IUpdateTransactionData,
    balanceId: string,
    transaction: ICreateTransactionResponse
  ): IBalanceInfo | undefined {
    if (!data.amount) {
      return undefined;
    }
    const balanceInfo: IBalanceInfo = {
      id: balanceId,
      newBalance: currentBalance,
    };

    if (data.type === "CASHIN") {
      balanceInfo.newBalance += data.amount;
    } else {
      if (currentBalance < data.amount) {
        throw new InvalidArgument("Insufficient funds");
      }
      balanceInfo.newBalance -= data.amount;
    }
    return balanceInfo;
  }
}
