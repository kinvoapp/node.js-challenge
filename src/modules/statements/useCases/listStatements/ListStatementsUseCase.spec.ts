import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import {
  Statement,
  STATEMENT_TYPE,
} from "../../infra/typeorm/entities/Statement";
import { StatementsRepositoryInMemory } from "../../infra/typeorm/repositories/In-memory/StatementsRepositoryInMemory";
import { InvalidByValue } from "../errors/InvalidByValue";
import { InvalidItensPerPageTypeValue } from "../errors/InvalidItensPerPageTypeValue";
import { InvalidPageNumberValue } from "../errors/InvalidPageNumberValue";
import { ListStatementsUseCase } from "./ListStatementsUseCase";

let listStatementsUseCase: ListStatementsUseCase;
let dateProvider: DayjsDateProvider;
let statementsRepository: StatementsRepositoryInMemory;

type asTest = "start_date" | "final_date";

describe("List Statements By Date", () => {
  beforeEach(() => {
    statementsRepository = new StatementsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    listStatementsUseCase = new ListStatementsUseCase(
      statementsRepository,
      dateProvider
    );
  });
  it("Should be able to list all statements after a certain date", async () => {
    const statementsForComparing: Statement[] = [];

    const dateNow = dateProvider.dateNowInUTC();

    statementsForComparing.push(
      await statementsRepository.create({
        amount: 200,
        description: "Test 1",
        type: STATEMENT_TYPE.INCOME,
        created_at: dateNow,
        updated_at: dateNow,
      })
    );

    statementsForComparing.push(
      await statementsRepository.create({
        amount: 100,
        description: "Test 2",
        type: STATEMENT_TYPE.INCOME,
        created_at: dateNow,
        updated_at: dateNow,
      })
    );

    const statements = await listStatementsUseCase.execute({
      date: dateProvider.manipulateDaysInUTC({ days: 1, type: "subtract" }),
      by: "start_date",
      itensPerPageType: 0,
      pageNumber: 1,
    });

    expect(statements).toEqual(statementsForComparing);
  });
  it("Should be able to list all statements until a certain date", async () => {
    const statementsForComparing: Statement[] = [];

    const dateNow = dateProvider.dateNowInUTC();

    statementsForComparing.push(
      await statementsRepository.create({
        amount: 200,
        description: "Test 1",
        type: STATEMENT_TYPE.INCOME,
        created_at: dateNow,
        updated_at: dateNow,
      })
    );

    statementsForComparing.push(
      await statementsRepository.create({
        amount: 100,
        description: "Test 2",
        type: STATEMENT_TYPE.INCOME,
        created_at: dateNow,
        updated_at: dateNow,
      })
    );

    const statements = await listStatementsUseCase.execute({
      date: dateProvider.manipulateDaysInUTC({ days: 1, type: "add" }),
      by: "final_date",
      itensPerPageType: 0,
      pageNumber: 1,
    });

    expect(statements).toEqual(statementsForComparing);
  });
  it("Should not be able to list all statements with a invalid by value", async () => {
    const dateNow = dateProvider.dateNowInUTC();

    await statementsRepository.create({
      amount: 200,
      description: "Test 1",
      type: STATEMENT_TYPE.INCOME,
      created_at: dateNow,
      updated_at: dateNow,
    });

    expect(async () => {
      await listStatementsUseCase.execute({
        date: dateProvider.manipulateDaysInUTC({ days: 1, type: "add" }),
        by: "test" as asTest,
        itensPerPageType: 0,
        pageNumber: 1,
      });
    }).rejects.toEqual(new InvalidByValue());
  });
  it("Should not be able to list all statements with a invalid itensPerPage value", async () => {
    const dateNow = dateProvider.dateNowInUTC();

    await statementsRepository.create({
      amount: 200,
      description: "Test 1",
      type: STATEMENT_TYPE.INCOME,
      created_at: dateNow,
      updated_at: dateNow,
    });

    expect(async () => {
      await listStatementsUseCase.execute({
        date: dateProvider.manipulateDaysInUTC({ days: 1, type: "add" }),
        by: "final_date",
        itensPerPageType: 7,
        pageNumber: 1,
      });
    }).rejects.toEqual(new InvalidItensPerPageTypeValue(0, 5));
  });
  it("Should not be able to list all statements with a invalid pageNumber value", async () => {
    const dateNow = dateProvider.dateNowInUTC();

    await statementsRepository.create({
      amount: 200,
      description: "Test 1",
      type: STATEMENT_TYPE.INCOME,
      created_at: dateNow,
      updated_at: dateNow,
    });

    expect(async () => {
      await listStatementsUseCase.execute({
        date: dateProvider.manipulateDaysInUTC({ days: 1, type: "add" }),
        by: "final_date",
        itensPerPageType: 0,
        pageNumber: 2,
      });
    }).rejects.toEqual(new InvalidPageNumberValue(1, 1));
  });
});
