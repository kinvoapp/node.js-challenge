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

describe("Get Transactions Controller", () => {
  it("should be able list all transactions", async () => {
    const studentRequest = mockICreateUserRequest();

    const createUserResponse = await createStudent(studentRequest);

    const loginRequest = {
      document: createUserResponse.document,
      password: "admin",
    };

    const token = await authenticateStudent(loginRequest);

    const transactionRequest = mockICreateTransactionRequest();

    for (let i = 0; i < 2; i++) {
      await createTransaction(transactionRequest, token);
    }

    const response = await superAppRequest
      .get("/transaction")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.transactions.length).toEqual(2);
  });
  it("should fail if student is not authenticated", async () => {
    const studentRequest = mockICreateUserRequest();

    await createStudent(studentRequest);

    const transactionRequest = mockICreateTransactionRequest();

    await superAppRequest.post("/transaction").send(transactionRequest);

    const response = await superAppRequest.get("/transaction");

    expect(response.status).toBe(401);
  });
  it("should be able list all transactions with filters", async () => {
    const studentRequest = mockICreateUserRequest();

    const createUserResponse = await createStudent(studentRequest);

    const loginRequest = {
      document: createUserResponse.document,
      password: "admin",
    };

    const token = await authenticateStudent(loginRequest);

    const transactionRequest = mockICreateTransactionRequest();

    for (let i = 0; i < 5; i++) {
      await createTransaction(transactionRequest, token);
    }

    const response = await superAppRequest
      .get("/transaction?itemsPerPage=3")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.transactions.length).toEqual(3);
  });
  it("should be able list all transactions with timestamp filters", async () => {
    const studentRequest = mockICreateUserRequest();

    const createUserResponse = await createStudent(studentRequest);

    const loginRequest = {
      document: createUserResponse.document,
      password: "admin",
    };

    const token = await authenticateStudent(loginRequest);

    const transactionRequest = mockICreateTransactionRequest();

    let lastCreatedAt: Date | null = null;

    for (let i = 0; i < 3; i++) {
      const transaction = await createTransaction(transactionRequest, token);
      lastCreatedAt = transaction.createdAt;
    }

    for (let i = 0; i < 2; i++) {
      await createTransaction(transactionRequest, token);
    }

    const response = await superAppRequest
      .get(`/transaction?end=${lastCreatedAt}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.transactions.length).toEqual(3);
  });
});
