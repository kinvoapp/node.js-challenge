import { Transaction, TransactionType } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
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
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateAccountRequest {
  studentId: string;
}

export interface ICreateAccountResponse {
  id: string;
  studentId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetAccountWithBalanceInfo extends ICreateAccountResponse {
  available: number;
  balanceId: string;
  balanceUpdatedAt: Date;
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
  description: string;
  amount: number;
  type: TransactionType;
  createdAt: Date;
  updatedAt: Date;
}

interface Pagination {
  itemsPerPage?: number;
  currentPage?: number;
}

export interface ITransactionPaginationRequest {
  itemsPerPage?: number;
  currentPage?: number;
  start?: Date;
  end?: Date;
}

export interface ITransactionPaginationResponse {
  transactions: ICreateTransactionResponse[];
  pagination?: Pagination;
}

export interface IBalanceResponse {
  studentId: string;
  available: number;
  updatedAt: Date;
}

export interface IUpdateTransactionData {
  description?: string;
  amount?: number;
  type?: TransactionType;
}

export interface IBalanceInfo {
  id: string;
  newBalance: number;
}
