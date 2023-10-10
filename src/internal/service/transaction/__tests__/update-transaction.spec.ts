import { describe, expect, it } from "@jest/globals";
import updateTransaction from "../update-transaction";
import transactionRepositoryMock, {
  transactionMock,
} from "./mock/transaction-repository-mock";
import { randomUUID } from "crypto";
import { GraphQLError } from "graphql";

describe("update transaction service", () => {
  it("should throw an error for a invalid id", () => {
    expect(
      updateTransaction(transactionRepositoryMock, randomUUID(), {
        amount: 200,
        type: "OUT",
      }),
    ).resolves.toBeInstanceOf(GraphQLError);
  });

  it("should throw an error for invalid data", () => {
    expect(
      updateTransaction(
        transactionRepositoryMock,
        "292f3665-46fd-4060-ba5d-2ec9c990aa0c",
        {
          // @ts-ignore
          amount: "invalid",
          // @ts-ignore
          type: "invalid",
        },
      ),
    ).resolves.toBeInstanceOf(GraphQLError);
  });

  it("should return nothing when it receives valid data", () => {
    expect(
      updateTransaction(
        transactionRepositoryMock,
        "292f3665-46fd-4060-ba5d-2ec9c990aa0c",
        {
          amount: 100,
          type: "IN",
        },
      ),
    ).resolves.toStrictEqual(transactionMock);
  });
});
