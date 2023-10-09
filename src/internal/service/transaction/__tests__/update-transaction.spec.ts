import { describe, expect, it } from "@jest/globals";
import updateTransaction from "../update-transaction";
import transactionRepositoryMock from "./mock/transaction-repository-mock";
import { randomUUID } from "crypto";

describe("update transaction service", () => {
  it("should throw an error for a invalid id", () => {
    expect(
      updateTransaction(transactionRepositoryMock, randomUUID(), {
        amount: 200,
        type: "OUT",
      }),
    ).rejects.toThrowError();
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
    ).rejects.toThrowError();
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
    ).resolves.toBeUndefined();
  });
});
