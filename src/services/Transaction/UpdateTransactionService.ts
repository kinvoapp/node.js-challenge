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
import { validateBalance } from "../Helpers/helper";

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
    const balanceInfo = this.buildBalanceInfo(
      account.available,
      data,
      account.balanceId,
      transaction
    );
    const updatedTransaction =
      await this.updateTransactionRepository.updateTransaction(
        transaction.id,
        data,
        balanceInfo
      );
    return updatedTransaction;
  }

  private buildBalanceInfo(
    currentBalance: number,
    data: IUpdateTransactionData,
    balanceId: string,
    transaction: ICreateTransactionResponse
  ): IBalanceInfo | undefined {
    const balanceInfo: IBalanceInfo = {
      id: balanceId,
      newBalance: currentBalance,
    };

    if (
      data.amount === transaction.amount &&
      (data.type === transaction.type || !data.type)
    ) {
      return undefined;
    }

    if (
      data.amount === transaction.amount &&
      data.type &&
      data.type !== transaction.type
    ) {
      if (transaction.type === "CASHOUT") {
        balanceInfo.newBalance += 2 * data.amount;
        return balanceInfo;
      }
      const debit = 2 * data.amount;
      validateBalance(currentBalance, debit);
      balanceInfo.newBalance -= debit;
      return balanceInfo;
    }

    if (!data.amount && data.type !== transaction.type) {
      if (transaction.type === "CASHIN") {
        const debit = 2 * transaction.amount;
        validateBalance(currentBalance, debit);
        balanceInfo.newBalance -= debit;
        return balanceInfo;
      } else {
        const credit = 2 * transaction.amount;
        balanceInfo.newBalance += credit;
        return balanceInfo;
      }
    }

    if (data.amount && data.amount !== transaction.amount) {
      if (transaction.type === "CASHIN") {
        if (data.type === "CASHIN" || !data.type) {
          if (data.amount > transaction.amount) {
            const difference = data.amount - transaction.amount;
            balanceInfo.newBalance += difference;
            return balanceInfo;
          } else {
            const debit = transaction.amount - data.amount;
            validateBalance(currentBalance, debit);
            balanceInfo.newBalance -= debit;
            return balanceInfo;
          }
        } else {
          const debitValue = transaction.amount + data.amount;
          validateBalance(currentBalance, debitValue);
          balanceInfo.newBalance -= debitValue;
          return balanceInfo;
        }
      } else {
        if (data.type === "CASHOUT" || !data.type) {
          if (data.amount < transaction.amount) {
            const credit = transaction.amount - data.amount;
            balanceInfo.newBalance += credit;
            return balanceInfo;
          } else {
            const debit = data.amount - transaction.amount;
            balanceInfo.newBalance -= debit;
            return balanceInfo;
          }
        } else {
          const credit = transaction.amount + data.amount;
          balanceInfo.newBalance += credit;
          return balanceInfo;
        }
      }
    }
  }
}
