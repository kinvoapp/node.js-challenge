import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import {
  Statement,
  STATEMENT_TYPE,
} from "../../infra/typeorm/entities/Statement";
import { IStatementsRepository } from "../../infra/typeorm/repositories/IStatementsRepository";
import { StatementDoesNotExists } from "../errors/StatementDoesNotExists";

interface IRequest {
  id: string;
  dataToUpdate: {
    amount: number;
    description: string;
    type: STATEMENT_TYPE;
  };
}

@injectable()
class UpdateStatementUseCase {
  constructor(
    @inject("StatementsRepository")
    private statementsRepository: IStatementsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}
  async execute({ id, dataToUpdate }: IRequest): Promise<Statement> {
    const statementExists = await this.statementsRepository.findById(id);

    if (!statementExists) {
      throw new StatementDoesNotExists();
    }

    Object.assign(statementExists, dataToUpdate);

    statementExists.updated_at = this.dateProvider.dateNowInUTC();

    await this.statementsRepository.create(statementExists);

    return statementExists;
  }
}

export { UpdateStatementUseCase };
