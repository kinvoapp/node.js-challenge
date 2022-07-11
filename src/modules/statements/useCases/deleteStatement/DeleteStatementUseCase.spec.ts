import { STATEMENT_TYPE } from "../../infra/typeorm/entities/Statement";
import { StatementsRepositoryInMemory } from "../../infra/typeorm/repositories/In-memory/StatementsRepositoryInMemory";
import { StatementDoesNotExists } from "../errors/StatementDoesNotExists";
import { DeleteStatementUseCase } from "./DeleteStatementUseCase";

let statementsRepository: StatementsRepositoryInMemory;
let deleteStatementUseCase: DeleteStatementUseCase;

describe("Delete statement", () => {
  beforeEach(() => {
    statementsRepository = new StatementsRepositoryInMemory();
    deleteStatementUseCase = new DeleteStatementUseCase(statementsRepository);
  });
  it("Should be able to delete an existing statement", async () => {
    await statementsRepository.create({
      amount: 100.0,
      description: "Test description",
      type: STATEMENT_TYPE.INCOME,
    });

    const statementForDelete = await statementsRepository.create({
      amount: 150.0,
      description: "Test description for Delete",
      type: STATEMENT_TYPE.INCOME,
    });

    await statementsRepository.create({
      amount: 200.0,
      description: "Test description",
      type: STATEMENT_TYPE.EXPENSE,
    });

    await deleteStatementUseCase.execute(statementForDelete.id);

    const deletedStatement = await statementsRepository.findById(
      statementForDelete.id
    );

    expect(deletedStatement).toEqual(undefined);
  });
  it("Should not be able to delete a nonexisting statement", async () => {
    expect(async () => {
      await deleteStatementUseCase.execute("AGQpS7xi5u");
    }).rejects.toEqual(new StatementDoesNotExists());
  });
});
