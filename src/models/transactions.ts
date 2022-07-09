import { IResponse } from "./api"
import { RequestHandler } from "express";
import { ParamsDictionary } from 'express-serve-static-core'


export interface ITransaction {
    id?: string,
    amount: number | string,
    type: "credit" | "debit"
    date: Date
    user_id: string
    created_at?: Date
    updated_at?: Date
}

export type TransactionAPI = RequestHandler<ParamsDictionary,
    IResponse<TransactionResponseMessage | ITransaction[]>,
    ITransaction>


export type TransactionResponseMessage =
    "Transaction created successfully" |
    "Transaction edited successfully" |
    "Transaction deleted successfully"