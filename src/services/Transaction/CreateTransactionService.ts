import { InvalidArgument, NotFound } from "../../domain/error";
import { IFindAccountByIdRepository } from "../../domain/interface/repositories/Account/IFindAccountByIdRepository";
import { ICreateTransactionRepository } from "../../domain/interface/repositories/Transaction/ICreateTransactionRepository";
import { IGetCurrentBalanceRepository } from "../../domain/interface/repositories/Transaction/IGetCurrentBalanceRepository";
import {
  ICreateTransactionRequest,
  ICreateTransactionResponse,
} from "../../domain/requestDto";

export class CreateTransactionService {
  private createTransactionRepository: ICreateTransactionRepository;
  private getCurrentBalanceRepository: IGetCurrentBalanceRepository;
  private findAccountByIdRepository: IFindAccountByIdRepository;

  constructor(
    createTransactionRepository: ICreateTransactionRepository,
    getCurrentBalanceRepository: IGetCurrentBalanceRepository,
    findAccountByIdRepository: IFindAccountByIdRepository
  ) {
    this.createTransactionRepository = createTransactionRepository;
    this.getCurrentBalanceRepository = getCurrentBalanceRepository;
    this.findAccountByIdRepository = findAccountByIdRepository;
  }

  async execute(
    data: ICreateTransactionRequest
  ): Promise<ICreateTransactionResponse> {
    const account = await this.findAccountByIdRepository.findAccountById(
      data.accountId
    );
    if (!account) {
      throw new NotFound("Account not found");
    }
    let currentBalance =
      await this.getCurrentBalanceRepository.getCurrentBalance(account.id);
    if (data.type === "CASHIN") {
      currentBalance += data.amount;
    } else {
      if (currentBalance < data.amount) {
        throw new InvalidArgument("Insufficient funds");
      }
      currentBalance -= data.amount;
    }
    const transaction =
      await this.createTransactionRepository.createTransaction(
        {
          ...data,
        },
        currentBalance
      );
    return transaction;
  }
}
