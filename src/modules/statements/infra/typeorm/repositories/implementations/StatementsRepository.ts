import {
  getRepository,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from "typeorm";

import { ICreateStatementDTO } from "../../../../dtos/ICreateStatementDTO";
import { IFindStatementsDTO } from "../../../../dtos/IFindStatementsDTO";
import { Statement } from "../../entities/Statement";
import { IStatementsRepository } from "../IStatementsRepository";

class StatementsRepository implements IStatementsRepository {
  private statements: Repository<Statement>;

  constructor() {
    this.statements = getRepository(Statement);
  }

  async create({
    id,
    amount,
    description,
    type,
    created_at,
    updated_at,
  }: ICreateStatementDTO): Promise<Statement> {
    const newStatement = this.statements.create({
      id,
      amount,
      description,
      type,
      created_at,
      updated_at,
    });

    await this.statements.save(newStatement);

    return newStatement;
  }

  async list({ date, by }: IFindStatementsDTO): Promise<Statement[]> {
    const statements = await this.statements.find({
      where: {
        created_at:
          by === "start_date" ? MoreThanOrEqual(date) : LessThanOrEqual(date),
      },
      order: {
        created_at: by === "start_date" ? "ASC" : "DESC",
      },
    });

    return statements;
  }

  async findById(id: string): Promise<Statement> {
    const statement = await this.statements.findOne({ id });

    return statement;
  }

  async delete(id: string): Promise<void> {
    await this.statements.delete({ id });
  }

  async balance(
    with_statements: boolean
  ): Promise<
    { balance: number } | { balance: number; statements: Statement[] }
  > {
    const statements = await this.statements.find();

    const balance = Number(
      statements
        .reduce((acc, operation) => {
          if (operation.type === "income") {
            return acc + Number(operation.amount);
          }

          return acc - Number(operation.amount);
        }, 0)
        .toFixed(2)
    );

    if (with_statements) {
      return {
        balance,
        statements,
      };
    }

    return { balance };
  }
}

export { StatementsRepository };
