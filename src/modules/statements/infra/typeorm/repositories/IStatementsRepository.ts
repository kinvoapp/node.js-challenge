import { ICreateStatementDTO } from "../../../dtos/ICreateStatementDTO";
import { IFindStatementsDTO } from "../../../dtos/IFindStatementsDTO";
import { Statement } from "../entities/Statement";

interface IStatementsRepository {
  create(data: ICreateStatementDTO): Promise<Statement>;
  list(data: IFindStatementsDTO): Promise<Statement[]>;
  findById(id: string): Promise<Statement>;
  delete(id: string): Promise<void>;
  balance(
    with_statements: boolean
  ): Promise<
    { balance: number } | { balance: number; statements: Statement[] }
  >;
}

export { IStatementsRepository };
