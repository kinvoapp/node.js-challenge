import { STATEMENT_TYPE } from "../../infra/typeorm/entities/Statement";
import { StatementsRepositoryInMemory } from "../../infra/typeorm/repositories/In-memory/StatementsRepositoryInMemory";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

let getBalanceUseCase: GetBalanceUseCase;
let statementsRepository: StatementsRepositoryInMemory;

describe("Get Balance", () => {
  beforeEach(() => {
    statementsRepository = new StatementsRepositoryInMemory();
    getBalanceUseCase = new GetBalanceUseCase(statementsRepository);
  });
  it("Should be able to return all statements and balance of the user", async () => {
    const statementsForCompare = [];

    statementsForCompare.push(
      await statementsRepository.create({
        amount: 200,
        description: "Test 1",
        type: STATEMENT_TYPE.INCOME,
      })
    );

    statementsForCompare.push(
      await statementsRepository.create({
        amount: 150,
        description: "Test 2",
        type: STATEMENT_TYPE.EXPENSE,
      })
    );

    statementsForCompare.push(
      await statementsRepository.create({
        amount: 200,
        description: "Test 3",
        type: STATEMENT_TYPE.INCOME,
      })
    );

    const balance = await getBalanceUseCase.execute();

    expect(balance.balance).toEqual(250);
    expect(balance.statements).toEqual(statementsForCompare);
  });
});
