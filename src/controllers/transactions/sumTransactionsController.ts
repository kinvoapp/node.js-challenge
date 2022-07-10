import { RequestHandler } from "express";
import { sumTransactionService } from "../../services/transactions/sumTransactionsService";


export const getBalance: RequestHandler = async (req, res) => {
    const id = req.userID!
    await sumTransactionService(id).then((balance) => {
        return res.status(200).json(balance)
    }).catch((error) => {
        return res.status(error.status).json({ message: error.message })
    })
}