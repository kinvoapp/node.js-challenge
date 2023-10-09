import { describe, expect, it } from "@jest/globals";
import { CreateTransactionDto } from "@/internal/dto/transaction";
import { createData } from "../validate-create-data";

describe("transaction create data", () => {
  it("should return false for invalid data", () => {
    const invalidData = {
      amount: "invalid",
      type: "INVALID",
    };
    // @ts-ignore
    const isValid = createData(invalidData);

    expect(isValid).toBe(false);
  });
  it("should return true for valid data", () => {
    const validData: CreateTransactionDto = {
      amount: 100,
      type: "IN",
    };

    const isValid = createData(validData);

    expect(isValid).toBe(true);
  });
});
