import { Decimal } from "@prisma/client/runtime/library";
import createTransaction from "../create-transaction";
import { describe, expect, it } from "@jest/globals";
import { transaction } from "@prisma/client";
import transactionRepositoryMock from "./mock/transaction-repository-mock";

describe("create transaction service", () => {
  it("should throw an error for invalid data", () => {
    expect(
      createTransaction(transactionRepositoryMock, {
        // @ts-ignore
        amount: "dasd",
        // @ts-ignore
        type: "ad",
      }),
    ).rejects.toThrowError();
  });

  it("should return the transaction for valid data", () => {
    const result: transaction = {
      id: "valid id",
      amount: new Decimal(100),
      type: "IN",
      created_at: new Date(1),
      updated_at: new Date(1),
    };
    expect(
      createTransaction(transactionRepositoryMock, {
        amount: 100,
        type: "IN",
      }),
    ).resolves.toStrictEqual(result);
  });
});
