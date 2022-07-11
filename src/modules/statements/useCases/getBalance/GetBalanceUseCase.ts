import { inject, injectable } from "tsyringe";

import { Statement } from "../../infra/typeorm/entities/Statement";
import { IStatementsRepository } from "../../infra/typeorm/repositories/IStatementsRepository";

interface IResponseData {
  balance: number;
  statements: Statement[];
}

@injectable()
class GetBalanceUseCase {
  constructor(
    @inject("StatementsRepository")
    private statementsRepository: IStatementsRepository
  ) {}
  async execute(): Promise<IResponseData> {
    const balanceData = await this.statementsRepository.balance(true);

    return balanceData as IResponseData;
  }
}

export { GetBalanceUseCase };
