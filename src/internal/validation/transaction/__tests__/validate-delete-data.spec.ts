import { describe, expect, it } from "@jest/globals";
import { deleteData } from "../validate-delete-data";

describe("transaction delete data", () => {
  it("should return false for invalid data", () => {
    const invalidData = "sadasd";

    const isValid = deleteData(invalidData);

    expect(isValid).toBe(false);
  });

  it("should return true for valid data", () => {
    const validData = "44ec89b7-d73e-4a49-acdf-7af040e9f654";

    const isValid = deleteData(validData);

    expect(isValid).toBe(true);
  });
});
