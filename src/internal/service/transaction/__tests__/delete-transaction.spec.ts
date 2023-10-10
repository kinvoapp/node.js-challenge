import { describe, expect, it } from "@jest/globals";
import transactionRepositoryMock, {
  transactionMock,
} from "./mock/transaction-repository-mock";
import deleteTransaction from "../delete-transaction";
import { randomUUID } from "crypto";
import { GraphQLError } from "graphql";

describe("update transaction service", () => {
  it("should throw an error for a invalid uuid", () => {
    expect(
      deleteTransaction(transactionRepositoryMock, "invalid uuid"),
    ).resolves.toBeInstanceOf(GraphQLError);
  });

  it("should throw an error for a id that doesn't exists in db", () => {
    expect(
      deleteTransaction(transactionRepositoryMock, randomUUID()),
    ).resolves.toBeInstanceOf(GraphQLError);
  });

  it("should return nothing when it receives valid data", () => {
    expect(
      deleteTransaction(
        transactionRepositoryMock,
        "292f3665-46fd-4060-ba5d-2ec9c990aa0c",
      ),
    ).resolves.toStrictEqual(transactionMock);
  });
});
