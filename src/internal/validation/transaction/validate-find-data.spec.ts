import type { FindTransactionDto } from "@/internal/dto/transaction";
import { describe, expect, it } from "@jest/globals";
import { findData } from "./validate-find-data";

describe("transaction find data", () => {
  it("should return false for invalid data", () => {
    const invalidData = {
      initialDate: "",
      finalDate: "",
    };
    // @ts-ignore
    const isValid = findData(invalidData);

    expect(isValid).toBe(false);
  });
  it("should return true for valid data", () => {
    const validData: FindTransactionDto = {
      initialDate: new Date("22/08/2005"),
      finalDate: new Date("22/08/2005"),
    };

    const isValid = findData(validData);

    expect(isValid).toBe(true);
  });
});
