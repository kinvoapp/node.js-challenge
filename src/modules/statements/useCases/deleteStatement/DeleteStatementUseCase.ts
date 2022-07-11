import { inject, injectable } from "tsyringe";

import { IStatementsRepository } from "../../infra/typeorm/repositories/IStatementsRepository";
import { StatementDoesNotExists } from "../errors/StatementDoesNotExists";

@injectable()
class DeleteStatementUseCase {
  constructor(
    @inject("StatementsRepository")
    private statementsRepository: IStatementsRepository
  ) {}
  async execute(id: string): Promise<void> {
    const statementExists = await this.statementsRepository.findById(id);

    if (!statementExists) {
      throw new StatementDoesNotExists();
    }

    await this.statementsRepository.delete(id);
  }
}

export { DeleteStatementUseCase };
