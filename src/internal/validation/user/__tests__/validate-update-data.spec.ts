import { describe, expect, it } from "@jest/globals";
import updateData from "../validate-update-data";

describe("validate update user data", () => {
  it("should return false for invalid data", () => {
    const isValid = updateData({
      name: "invalid",
      email: "invalid",
    });

    expect(isValid).toBe(false);
  });

  it("should return true for valid data", () => {
    const isValid = updateData({
      name: "valid name",
      email: "valid@email.com",
    });

    expect(isValid).toBe(true);
  });

  it("should return true for no data", () => {
    const isValid = updateData({});

    expect(isValid).toBe(true);
  });
});
