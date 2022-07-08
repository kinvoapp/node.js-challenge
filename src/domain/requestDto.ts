import { TransactionType } from "@prisma/client";
import { Request } from "express";

export interface ICreateTransactionRequest {
  description: string;
  amount: number;
  type: TransactionType;
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
  created_at: Date;
  updated_at: Date;
  password?: string;
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
}

export interface RequestWithStudentId extends Request {
  student_id: string;
}

export interface IAuthenticateStudentRequest {
  document: string;
  password: string;
}
