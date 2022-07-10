import {
  IAuthenticateStudentRequest,
  IAuthenticateStudentResponse,
  ICreateStudentRequest,
  ICreateStudentResponse,
  ICreateTransactionRequest,
  ICreateTransactionResponse,
} from "../../src/domain/requestDto";
import { superAppRequest } from "../setup";

export async function createStudent(body: ICreateStudentRequest) {
  const createStudentResponse = await superAppRequest
    .post("/student")
    .send(body);
  const createStudentResponseBody =
    createStudentResponse.body as ICreateStudentResponse;
  return createStudentResponseBody;
}

export async function authenticateStudent(body: IAuthenticateStudentRequest) {
  const authenticateStudentResponse = await superAppRequest
    .post("/login/student")
    .send(body);
  const authenticateResponseBody =
    authenticateStudentResponse.body as IAuthenticateStudentResponse;
  return authenticateResponseBody.token;
}

export async function createTransaction(
  body: ICreateTransactionRequest,
  token: string
) {
  const createTransactionResponse = await superAppRequest
    .post("/transaction")
    .send(body)
    .set("Authorization", `Bearer ${token}`);
  const createTransactionResponseBody =
    createTransactionResponse.body as ICreateTransactionResponse;
  return createTransactionResponseBody;
}
