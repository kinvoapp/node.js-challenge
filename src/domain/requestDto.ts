import { Transaction, TransactionType } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { Request } from "express";

export interface ICreateTransactionRequest {
  description: string;
  amount: number;
  type: TransactionType;
  accountId: string;
}

export interface ICreateStudentRequest {
  name: string;
  password: string;
  document: string;
}

export interface ICreateStudentResponse {
  id: string;
  name: string;
  document: string;
  accountId: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICreateAccountRequest {
  studentId: string;
}

export interface ICreateAccountResponse {
  id: string;
  studentId: string;
  created_at: Date;
  updated_at: Date;
}

export interface IPayload {
  sub: string;
  accountId: string;
}

export interface RequestWithStudentInfo extends Request {
  studentId: string;
  accountId: string;
}

export interface IAuthenticateStudentRequest {
  document: string;
  password: string;
}

export interface ICreateTransactionResponse {
  id: string;
  accountId: string;
  currentBalance: number;
  description: string;
  amount: number;
  type: TransactionType;
  created_at: Date;
  updated_at: Date;
}
