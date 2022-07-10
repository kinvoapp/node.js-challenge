import { ITransaction } from "@models/transactions";
import { Request, Response } from "express";
import { editTransaction } from "./../../services/transactions/updateTransactionService";


export const updateTransaction = async (req: Request<ITransaction>, res: Response) => {
    const { amount, date, type } = req.body
    const user_id = req.userID!
    const { id } = req.params

    const transaction: ITransaction = {
        amount: amount, date, type, user_id, id
    }

    await editTransaction(transaction).then(() => {
        return res.status(201).json({ data: "Transaction updated successfully" })
    }).catch((error) => {
        if (error.status) {
            return res.status(error.status).json(error.error)
        }
        return res.status(500).json(error)
    })

}