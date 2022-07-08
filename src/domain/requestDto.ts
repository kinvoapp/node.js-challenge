import { TransactionType } from "@prisma/client";

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
}
