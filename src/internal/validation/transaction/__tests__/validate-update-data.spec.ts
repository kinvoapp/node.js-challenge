import { describe, expect, it } from "@jest/globals";
import { updateData } from "../validate-update-data";
import { UpdateTransactionDto } from "@/internal/dto/transaction";

describe("transaction update data", () => {
  it("should return false for invalid data", () => {
    const invalidId = "alo";
    const invalidData = {
      amount: "invalid",
      type: "INVALID",
    };

    // @ts-ignore
    const isValid = updateData(invalidId, invalidData);

    expect(isValid).toBe(false);
  });

  it("should return true for valid data", () => {
    const validId = "44ec89b7-d73e-4a49-acdf-7af040e9f654";
    const validData: UpdateTransactionDto = {
      amount: 300,
      type: "IN",
    };

    const isValid = updateData(validId, validData);

    expect(isValid).toBe(true);
  });

  it("should return true for only passing the amount", () => {
    const validId = "44ec89b7-d73e-4a49-acdf-7af040e9f654";
    const validData: UpdateTransactionDto = {
      amount: 300,
    };

    const isValid = updateData(validId, validData);

    expect(isValid).toBe(true);
  });

  it("should return true for only passing the type", () => {
    const validId = "44ec89b7-d73e-4a49-acdf-7af040e9f654";
    const validData: UpdateTransactionDto = {
      type: "IN",
    };

    const isValid = updateData(validId, validData);

    expect(isValid).toBe(true);
  });
});
