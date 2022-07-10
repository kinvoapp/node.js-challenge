import { faker } from "@faker-js/faker";
import {
  ICreateStudentRequest,
  ICreateTransactionRequest,
  IUpdateTransactionData,
} from "../../src/domain/requestDto";

export function mockICreateUserRequest() {
  const studentData: ICreateStudentRequest = {
    name: faker.name.findName(),
    document: Math.floor(Math.random() * 100000000000).toString(),
    password: "admin",
  };
  return studentData;
}

export function mockICreateTransactionRequest() {
  const transactionData: ICreateTransactionRequest = {
    amount: faker.datatype.number(),
    description: faker.commerce.productDescription(),
    type: "CASHIN",
  };
  return transactionData;
}

export function mockIUpdateTransactionRequest() {
  const transactionData: IUpdateTransactionData = {
    amount: faker.datatype.number(),
    description: faker.commerce.productDescription(),
    type: "CASHIN",
  };

  return transactionData;
}
