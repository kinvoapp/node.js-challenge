import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { STATEMENT_TYPE } from "../../infra/typeorm/entities/Statement";
import { StatementsRepositoryInMemory } from "../../infra/typeorm/repositories/In-memory/StatementsRepositoryInMemory";
import { StatementDoesNotExists } from "../errors/StatementDoesNotExists";
import { UpdateStatementUseCase } from "./UpdateStatementUseCase";

let statementsRepository: StatementsRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let updateStatementUseCase: UpdateStatementUseCase;

describe("Update Statement", () => {
  beforeEach(() => {
    statementsRepository = new StatementsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    updateStatementUseCase = new UpdateStatementUseCase(
      statementsRepository,
      dateProvider
    );
  });
  it("Should be able to update an existing statement", async () => {
    const createdStatement = await statementsRepository.create({
      amount: 200,
      description: "Test",
      type: STATEMENT_TYPE.INCOME,
    });

    const updatedStatement = await updateStatementUseCase.execute({
      id: createdStatement.id,
      dataToUpdate: {
        amount: 250,
        description: "Test modified",
        type: STATEMENT_TYPE.EXPENSE,
      },
    });

    expect(updatedStatement.id).toEqual(createdStatement.id);
    expect(updatedStatement.amount).toEqual(250);
    expect(updatedStatement.description).toEqual("Test modified");
    expect(updatedStatement.type).toEqual("expense");
    expect(updatedStatement.updated_at.toString().split(":")[0]).toEqual(
      dateProvider.dateNowInUTC().toString().split(":")[0]
    );
  });
  it("Should not be able to update an nonexisting statement", async () => {
    expect(async () => {
      await updateStatementUseCase.execute({
        id: "QZYwshQlkm",
        dataToUpdate: {
          amount: 250,
          description: "Test modified",
          type: STATEMENT_TYPE.EXPENSE,
        },
      });
    }).rejects.toEqual(new StatementDoesNotExists());
  });
});
