import { NotFound } from "../../domain/error";
import { IGetAccountWithBalanceRepository } from "../../domain/interface/repositories/Account/IGetAccountWithBalanceRepository";
import { IGetAccountWithBalanceInfo } from "../../domain/requestDto";

export class GetAccountBalanceService {
  private getAccountWithBalanceRepository: IGetAccountWithBalanceRepository;

  constructor(
    getAccountWithBalanceRepository: IGetAccountWithBalanceRepository
  ) {
    this.getAccountWithBalanceRepository = getAccountWithBalanceRepository;
  }

  async execute(accountId: string): Promise<IGetAccountWithBalanceInfo> {
    const account =
      await this.getAccountWithBalanceRepository.getAccountWithBalance(
        accountId
      );
    if (!account) {
      throw new NotFound("Account doesn't exist");
    }

    return account;
  }
}
