import { ICreateStatementDTO } from "../../../../dtos/ICreateStatementDTO";
import { IFindStatementsDTO } from "../../../../dtos/IFindStatementsDTO";
import { Statement } from "../../entities/Statement";
import { IStatementsRepository } from "../IStatementsRepository";

class StatementsRepositoryInMemory implements IStatementsRepository {
  private repository: Statement[];

  constructor() {
    this.repository = [];
  }

  async create({
    amount,
    description,
    type,
    created_at,
    updated_at,
  }: ICreateStatementDTO): Promise<Statement> {
    const newStatement = new Statement();

    Object.assign(newStatement, {
      amount,
      description,
      type,
      created_at,
      updated_at,
    });

    this.repository.push(newStatement);

    return newStatement;
  }

  async list({ date, by }: IFindStatementsDTO): Promise<Statement[]> {
    let statements: Statement[];
    if (by === "start_date") {
      statements = this.repository.filter(
        (statement) => statement.created_at >= date
      );
    } else {
      statements = this.repository.filter(
        (statement) => statement.created_at <= date
      );
    }

    return statements;
  }

  async findById(id: string): Promise<Statement> {
    return this.repository.find((statement) => statement.id === id);
  }

  async delete(id: string): Promise<void> {
    const statementIndex = this.repository.findIndex(
      (statement) => statement.id === id
    );

    this.repository = this.repository.slice(statementIndex, 1);
  }

  async balance(
    with_statements: boolean
  ): Promise<
    { balance: number } | { balance: number; statements: Statement[] }
  > {
    const balance = this.repository.reduce((acc, operation) => {
      if (operation.type === "income") {
        return acc + operation.amount;
      }

      return acc - operation.amount;
    }, 0);

    if (with_statements) {
      return {
        balance,
        statements: this.repository,
      };
    }

    return { balance };
  }
}

export { StatementsRepositoryInMemory };
