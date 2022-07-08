import { SpendDeleteUseCase } from "./../src/usecases/Spend/delete-use-case";
import { SpendUpdateUseCase } from "./../src/usecases/Spend/update-use-case";
import { SpendReadUseCase } from "./../src/usecases/Spend/read-use-case";
import { SpendCreateUseCase } from "./../src/usecases/Spend/create-use-case";

const createSpy = jest.fn();
const readSpy = jest.fn();
const updateSpy = jest.fn();
const deleteSpy = jest.fn();

describe("Create spend tests", () => {
  const createSpend = new SpendCreateUseCase({
    create: createSpy,
    read: readSpy,
    update: updateSpy,
    delete: deleteSpy,
  });

  it("Should create a spend", async () => {
    await expect(
      createSpend.create({
        name: "Test",
        value: 120,
      })
    ).resolves.not.toThrow();

    expect(createSpy).toHaveBeenCalled();
  });

  it("Should throw error due to missing name", async () => {
    await expect(
      createSpend.create({
        name: "",
        value: 120,
      })
    ).rejects.toThrow();
  });

  it("Should throw error due to invalid value", async () => {
    await expect(
      createSpend.create({
        name: "Test",
        value: 0,
      })
    ).rejects.toThrow();
  });
});

describe("Spend Read tests", () => {
  const readSpend = new SpendReadUseCase({
    create: createSpy,
    read: readSpy,
    update: updateSpy,
    delete: deleteSpy,
  });

  it("Should return all spends", async () => {
    await expect(
      readSpend.read({
        start: new Date(1607110465663),
        end: new Date(1668495886000),
      })
    ).resolves.not.toThrow();

    expect(readSpy).toHaveBeenCalled();
  });

  it("Should throw error due to invalid dates", async () => {
    await expect(
      readSpend.read({
        start: new Date(1668495886000),
        end: new Date(1607110465663),
      })
    ).rejects.toThrow();
  });
});

describe("Spend update tests", () => {
  const updateSpend = new SpendUpdateUseCase({
    create: createSpy,
    read: readSpy,
    update: updateSpy,
    delete: deleteSpy,
  });

  it("Should update a spend", async () => {
    await expect(
      updateSpend.update({
        id: 1,
        name: "Update",
        value: 130,
      })
    ).resolves.not.toThrow();

    expect(updateSpy).toHaveBeenCalled();
  });

  it("Should throw error due to invalid id", async () => {
    await expect(
      updateSpend.update({
        id: 0,
        name: "Update",
        value: 130,
      })
    ).rejects.toThrow();
  });

  it("Should throw error due to missing name", async () => {
    await expect(
      updateSpend.update({
        id: 1,
        name: "",
        value: 130,
      })
    ).rejects.toThrow();
  });

  it("Should throw error due to missing value", async () => {
    await expect(
      updateSpend.update({
        id: 1,
        name: "Update",
        value: 0,
      })
    ).rejects.toThrow();
  });
});

describe("Spend delete tests", () => {
  const deleteSpend = new SpendDeleteUseCase({
    create: createSpy,
    read: readSpy,
    update: updateSpy,
    delete: deleteSpy,
  });

  it("Should delete a spend", async () => {
    await expect(deleteSpend.delete({ id: 1 })).resolves.not.toThrow();

    expect(deleteSpy).toHaveBeenCalled();
  });

  it("Should throw error due to invalid id", async () => {
    await expect(deleteSpend.delete({ id: 0 })).rejects.toThrow();
  });
});
