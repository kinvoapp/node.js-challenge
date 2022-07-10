import { RequestHandler } from "express";
import { removeTransaction } from "../../services/transactions/deleteTransactionService";


export const deleteTransaction: RequestHandler = async (req, res) => {
    const { id } = req.params

    await removeTransaction(id).then(() => {
        return res.status(200).json({ data: "Transaction deleted successfully" })
    }).catch((error) => {
        if (error.message) {
            return res.status(error.status).json(error.message)
        }
        return res.status(500).json(error)
    })

}