import type { FindTransactionDto } from "@/internal/dto/transaction";
import { describe, expect, it } from "@jest/globals";
import { findData } from "../validate-find-data";

describe("transaction find data", () => {
  it("should return false for invalid data", () => {
    const invalidData = {
      initialDate: "invalid",
      finalDate: "invalid",
    };
    // @ts-ignore
    const isValid = findData(invalidData);

    expect(isValid).toBe(false);
  });

  it("should return true for valid data", () => {
    const validData: FindTransactionDto = {
      initialDate: "2000-08-22",
      finalDate: "2000-08-22",
    };

    const isValid = findData(validData);

    expect(isValid).toBe(true);
  });

  it("should return true by receiving first date only", () => {
    const validData: FindTransactionDto = {
      initialDate: "2000-08-22",
    };

    const isValid = findData(validData);

    expect(isValid).toBe(true);
  });

  it("should return true by receiving second date only", () => {
    const validData: FindTransactionDto = {
      finalDate: "2000-08-22",
    };

    const isValid = findData(validData);

    expect(isValid).toBe(true);
  });
});
