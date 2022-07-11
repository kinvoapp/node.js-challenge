import { InvalidArgument } from "../../domain/error";
import { ICreateTransactionRepository } from "../../domain/interface/repositories/Transaction/ICreateTransactionRepository";
import { IGetAccountWithBalanceRepository } from "../../domain/interface/repositories/Account/IGetAccountWithBalanceRepository";
import {
  ICreateTransactionRequest,
  ICreateTransactionResponse,
} from "../../domain/requestDto";
import { GetAccountBalanceService } from "../Account/GetAccountBalanceService";
import { ICreateTransactionService } from "../../domain/interface/services/Transaction/ICreateTransactionService";

export class CreateTransactionService implements ICreateTransactionService {
  private createTransactionRepository: ICreateTransactionRepository;
  private getAccountWithBalanceRepository: IGetAccountWithBalanceRepository;

  constructor(
    createTransactionRepository: ICreateTransactionRepository,
    getAccountWithBalanceRepository: IGetAccountWithBalanceRepository
  ) {
    this.createTransactionRepository = createTransactionRepository;
    this.getAccountWithBalanceRepository = getAccountWithBalanceRepository;
  }

  async execute(
    data: ICreateTransactionRequest,
    accountId: string
  ): Promise<ICreateTransactionResponse> {
    const getAccountBalanceService = new GetAccountBalanceService(
      this.getAccountWithBalanceRepository
    );
    const account = await getAccountBalanceService.execute(accountId);
    let newBalance = account.available;
    if (data.type === "CASHIN") {
      newBalance += data.amount;
    } else {
      if (account.available < data.amount) {
        throw new InvalidArgument("Insufficient funds");
      }
      newBalance -= data.amount;
    }
    const transaction =
      await this.createTransactionRepository.createTransaction(
        {
          ...data,
        },
        newBalance,
        account.id,
        account.balanceId
      );
    return transaction;
  }
}
