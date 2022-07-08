import { IncomeDeleteUseCase } from "./../src/usecases/Income/delete-use-case";
import { IncomeUpdateUseCase } from "./../src/usecases/Income/update-use-case";
import { IncomeReadUseCase } from "./../src/usecases/Income/read-use-case";
import { IncomeCreateUseCase } from "./../src/usecases/Income/create-use-case";

const createSpy = jest.fn();
const readSpy = jest.fn();
const updateSpy = jest.fn();
const deleteSpy = jest.fn();

describe("Create income tests", () => {
  const createIncome = new IncomeCreateUseCase({
    create: createSpy,
    read: readSpy,
    update: updateSpy,
    delete: deleteSpy,
  });

  it("Should create a income", async () => {
    await expect(
      createIncome.create({
        name: "Test",
        value: 120,
      })
    ).resolves.not.toThrow();

    expect(createSpy).toHaveBeenCalled();
  });

  it("Should throw error due to name missing", async () => {
    await expect(
      createIncome.create({
        name: "",
        value: 120,
      })
    ).rejects.toThrow();
  });

  it("Should throw error due to invalid value", async () => {
    await expect(
      createIncome.create({
        name: "Test",
        value: 0,
      })
    ).rejects.toThrow();
  });
});

describe("Read incomes tests", () => {
  const readIncome = new IncomeReadUseCase({
    create: createSpy,
    read: readSpy,
    update: updateSpy,
    delete: deleteSpy,
  });

  it("Should return all incomes", async () => {
    await expect(
      readIncome.read({
        start: new Date(1607110465663),
        end: new Date(1668495886000),
      })
    ).resolves.not.toThrow();

    expect(readSpy).toHaveBeenCalled();
  });

  it("Should throw error due to invalid dates", async () => {
    await expect(
      readIncome.read({
        start: new Date(1668495886000),
        end: new Date(1607110465663),
      })
    ).rejects.toThrow();
  });
});

describe("Update incomes tests", () => {
  const updateIncome = new IncomeUpdateUseCase({
    create: createSpy,
    read: readSpy,
    update: updateSpy,
    delete: deleteSpy,
  });

  it("Should update a income", async () => {
    await expect(
      updateIncome.update({
        name: "Update",
        value: 110,
        id: 1,
      })
    ).resolves.not.toThrow();

    expect(updateSpy).toHaveBeenCalled();
  });

  it("Should throw error due to missing name", async () => {
    await expect(
      updateIncome.update({
        name: "",
        value: 110,
        id: 1,
      })
    ).rejects.toThrow();
  });

  it("Should throw error due to invalid value", async () => {
    await expect(
      updateIncome.update({
        name: "Update",
        value: 0,
        id: 1,
      })
    ).rejects.toThrow();
  });

  it("Should throw error due to invalid id", async () => {
    await expect(
      updateIncome.update({
        name: "Update",
        value: 110,
        id: 0,
      })
    ).rejects.toThrow();
  });
});

describe("Delete incomes tests", () => {
  const deleteIncome = new IncomeDeleteUseCase({
    create: createSpy,
    read: readSpy,
    update: updateSpy,
    delete: deleteSpy,
  });

  it("Should delete a income", async () => {
    await expect(deleteIncome.delete({ id: 1 })).resolves.not.toThrow();

    expect(deleteSpy).toHaveBeenCalled();
  });

  it("Should throw error due to invalid id", async () => {
    await expect(deleteIncome.delete({ id: 0 })).rejects.toThrow();
  });
});
