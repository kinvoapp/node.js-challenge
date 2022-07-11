import { authenticateStudent, createStudent } from "../../helpers/helper";
import {
  mockICreateTransactionRequest,
  mockICreateUserRequest,
} from "../../helpers/mock";
import { superAppRequest } from "../../setup";

describe("Create Transaction Controller", () => {
  it("should be able to create a new transaction", async () => {
    const studentRequest = mockICreateUserRequest();

    const createUserResponse = await createStudent(studentRequest);

    const loginRequest = {
      document: createUserResponse.document,
      password: "admin",
    };

    const token = await authenticateStudent(loginRequest);

    const transactionRequest = mockICreateTransactionRequest();

    const response = await superAppRequest
      .post("/transaction")
      .send(transactionRequest)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.amount).toEqual(transactionRequest.amount);
  });
  it("should fail if student is not authenticated", async () => {
    const studentRequest = mockICreateUserRequest();

    await createStudent(studentRequest);

    const transactionRequest = mockICreateTransactionRequest();

    const response = await superAppRequest
      .post("/transaction")
      .send(transactionRequest);

    expect(response.status).toBe(401);
  });
  it("should fail due to insufficient funds", async () => {
    const studentRequest = mockICreateUserRequest();

    const createUserResponse = await createStudent(studentRequest);

    const loginRequest = {
      document: createUserResponse.document,
      password: "admin",
    };

    const token = await authenticateStudent(loginRequest);

    const transactionRequest = mockICreateTransactionRequest();
    transactionRequest.type = "CASHOUT";

    const response = await superAppRequest
      .post("/transaction")
      .send(transactionRequest)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.error).toEqual("Insufficient funds");
  });
});
