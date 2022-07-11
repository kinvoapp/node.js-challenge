import { NotFound } from "../../domain/error";
import { IGetAccountWithBalanceRepository } from "../../domain/interface/repositories/Account/IGetAccountWithBalanceRepository";
import { IDeleteTransactionRepository } from "../../domain/interface/repositories/Transaction/IDeleteTransactionRepository";
import { IGetTransactionRepository } from "../../domain/interface/repositories/Transaction/IGetTransactionRepository";
import { IBalanceInfoWithType } from "../../domain/requestDto";
import { GetAccountBalanceService } from "../Account/GetAccountBalanceService";
import { validateBalance } from "../../helpers/helper";
import { IDeleteTransactionService } from "../../domain/interface/services/Transaction/IDeleteTransactionService";

export class DeleteTransactionService implements IDeleteTransactionService {
  private getTransactionRepository: IGetTransactionRepository;
  private deleteTransactionRepository: IDeleteTransactionRepository;
  private getAccountWithBalanceRepository: IGetAccountWithBalanceRepository;

  constructor(
    getTransactionRepository: IGetTransactionRepository,
    deleteTransactionRepository: IDeleteTransactionRepository,
    getAccountWithBalanceRepository: IGetAccountWithBalanceRepository
  ) {
    this.getTransactionRepository = getTransactionRepository;
    this.deleteTransactionRepository = deleteTransactionRepository;
    this.getAccountWithBalanceRepository = getAccountWithBalanceRepository;
  }

  async execute(id: string, accountId: string) {
    const getAccountBalanceService = new GetAccountBalanceService(
      this.getAccountWithBalanceRepository
    );
    const account = await getAccountBalanceService.execute(accountId);
    const transaction = await this.getTransactionRepository.getTransaction(
      id,
      account.id
    );

    if (!transaction) {
      throw new NotFound("Transaction doesn't exist");
    }

    const balanceInfo: IBalanceInfoWithType = {
      id: account.balanceId,
      newBalance: account.available,
      type: transaction.type,
    };
    if (transaction.type === "CASHIN") {
      validateBalance(account.available, transaction.amount);
      balanceInfo.newBalance -= transaction.amount;
    } else {
      balanceInfo.newBalance += transaction.amount;
    }

    await this.deleteTransactionRepository.deleteTransaction(id, balanceInfo);
  }
}
