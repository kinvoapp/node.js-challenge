import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import {
  Statement,
  STATEMENT_TYPE,
} from "../../infra/typeorm/entities/Statement";
import { StatementsRepositoryInMemory } from "../../infra/typeorm/repositories/In-memory/StatementsRepositoryInMemory";
import { InvalidAmount } from "../errors/InvalidAmount";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

let statementsRepository: StatementsRepositoryInMemory;
let createStatementUseCase: CreateStatementUseCase;
let dateProvider: DayjsDateProvider;

describe("Create Statement", () => {
  beforeEach(() => {
    statementsRepository = new StatementsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    createStatementUseCase = new CreateStatementUseCase(
      statementsRepository,
      dateProvider
    );
  });
  it("Should be able to create a new income type statement", async () => {
    const createdStatement = await createStatementUseCase.execute({
      amount: 100.0,
      description: "Test description",
      type: STATEMENT_TYPE.INCOME,
    });

    expect(createdStatement).toHaveProperty("id");
    expect(createdStatement.type).toEqual("income");
    expect(createdStatement).toBeInstanceOf(Statement);
  });
  it("Should be able to create a new expense type statement", async () => {
    const createdStatement = await createStatementUseCase.execute({
      amount: 100.0,
      description: "Test description",
      type: STATEMENT_TYPE.EXPENSE,
    });

    expect(createdStatement).toHaveProperty("id");
    expect(createdStatement.type).toEqual("expense");
    expect(createdStatement).toBeInstanceOf(Statement);
  });
  it("Should not be able to create a new statement with negative amount", async () => {
    expect(async () => {
      await createStatementUseCase.execute({
        amount: -100.0,
        description: "Test description",
        type: STATEMENT_TYPE.EXPENSE,
      });
    }).rejects.toEqual(new InvalidAmount());
  });
  it("Should not be able to create a new statement with amount over R$ 9999,99", async () => {
    expect(async () => {
      await createStatementUseCase.execute({
        amount: 10000,
        description: "Test description",
        type: STATEMENT_TYPE.EXPENSE,
      });
    }).rejects.toEqual(new InvalidAmount());
  });
});
