import {
  authenticateStudent,
  createStudent,
  createTransaction,
} from "../../helpers/helper";
import {
  mockICreateTransactionRequest,
  mockICreateUserRequest,
} from "../../helpers/mock";
import { superAppRequest } from "../../setup";

describe("Delete Transaction Controller", () => {
  it("should be able to delete a transaction", async () => {
    const studentRequest = mockICreateUserRequest();

    const createUserResponse = await createStudent(studentRequest);

    const loginRequest = {
      document: createUserResponse.document,
      password: "admin",
    };

    const token = await authenticateStudent(loginRequest);

    const transactionRequest = mockICreateTransactionRequest();

    const transactionResponse = await createTransaction(
      transactionRequest,
      token
    );

    const response = await superAppRequest
      .delete(`/transaction/${transactionResponse.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
  it("should fail if transaction doesnt's exist", async () => {
    const studentRequest = mockICreateUserRequest();

    const createUserResponse = await createStudent(studentRequest);

    const loginRequest = {
      document: createUserResponse.document,
      password: "admin",
    };

    const token = await authenticateStudent(loginRequest);

    const response = await superAppRequest
      .delete(`/transaction/1234`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
});
