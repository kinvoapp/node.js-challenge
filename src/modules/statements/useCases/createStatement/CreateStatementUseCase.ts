import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import {
  Statement,
  STATEMENT_TYPE,
} from "../../infra/typeorm/entities/Statement";
import { IStatementsRepository } from "../../infra/typeorm/repositories/IStatementsRepository";
import { InvalidAmount } from "../errors/InvalidAmount";

interface IRequest {
  amount: number;
  description: string;
  type: STATEMENT_TYPE;
}

@injectable()
class CreateStatementUseCase {
  constructor(
    @inject("StatementsRepository")
    private statementsRepository: IStatementsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute({ amount, description, type }: IRequest): Promise<Statement> {
    if (amount < 0.01 || amount > 9999.99) {
      throw new InvalidAmount();
    }

    const newStatement = await this.statementsRepository.create({
      amount,
      description,
      type,
    });

    return newStatement;
  }
}

export { CreateStatementUseCase };
