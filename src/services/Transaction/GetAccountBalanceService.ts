import { NotFound } from "../../domain/error";
import { IFindAccountByIdRepository } from "../../domain/interface/repositories/Account/IFindAccountByIdRepository";
import { IGetCurrentBalanceRepository } from "../../domain/interface/repositories/Transaction/IGetCurrentBalanceRepository";

export class GetAccountBalanceService {
  private getCurrentBalanceRepository: IGetCurrentBalanceRepository;
  private findAccountByIdRepository: IFindAccountByIdRepository;

  constructor(
    getCurrentBalanceRepository: IGetCurrentBalanceRepository,
    findAccountByIdRepository: IFindAccountByIdRepository
  ) {
    this.getCurrentBalanceRepository = getCurrentBalanceRepository;
    this.findAccountByIdRepository = findAccountByIdRepository;
  }

  async execute(accountId: string) {
    const account = await this.findAccountByIdRepository.findAccountById(
      accountId
    );
    if (!account) {
      throw new NotFound("Account not found");
    }
    return this.getCurrentBalanceRepository.getCurrentBalance(account.id);
  }
}
