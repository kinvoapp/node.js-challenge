import {
  authenticateStudent,
  createStudent,
  createTransaction,
} from "../../helpers/helper";
import {
  mockICreateTransactionRequest,
  mockICreateUserRequest,
  mockIUpdateTransactionRequest,
} from "../../helpers/mock";
import { superAppRequest } from "../../setup";

describe("Update Transaction Controller", () => {
  it("should be able to update a transaction", async () => {
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

    const updateTransactionRequest = mockIUpdateTransactionRequest();

    const response = await superAppRequest
      .patch(`/transaction/${transactionResponse.id}`)
      .send(updateTransactionRequest)
      .set("Authorization", `Bearer ${token}`);

    const getTransaction = await superAppRequest
      .get("/transaction")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(getTransaction.body.transactions[0].amount).toEqual(
      updateTransactionRequest.amount
    );
  });
});
