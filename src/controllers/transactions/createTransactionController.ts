import { requestAPI } from "@models/api";
import { ITransaction } from "@models/transactions";
import { addTransaction } from "../../services/transactions/createTransactionService";


export const createTransaction: requestAPI<ITransaction> = async (req, res) => {
    const { amount, date, type } = req.body
    const user_id = req.userID!

    const transaction: ITransaction = {
        amount: amount, date, type, user_id
    }
    await addTransaction(transaction).then(() => {
        return res.status(201).json({ data: "Transaction created successfully" })
    }).catch((error) => {
        if (error.status) {
            return res.status(error.status).json(error.message)
        }
        return res.status(500).json(error)

    })

}