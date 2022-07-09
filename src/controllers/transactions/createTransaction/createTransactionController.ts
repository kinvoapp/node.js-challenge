import { ITransaction, TransactionAPI } from "@models/transactions";
import { getErrorMessage } from "../../../utils/handleErrors";
import { addTransaction } from "./createTransactionService";


export const createTransaction: TransactionAPI = async (req, res) => {
    const { amount, date, type } = req.body
    const user_id = '1'

    const transaction: ITransaction = {
        amount: amount, date, type, user_id
    }

    try {
        const newTransaction = await addTransaction(transaction)

        if (!newTransaction) {
            throw Error('Internal Error')
        }

        return res.status(201).json({ data: "Transaction created successfully" })

    } catch (error) {
        // if (error = "Internal Error") {
        //     return res.status(404).json({ error })
        // }
        return res.status(400).json({ error: getErrorMessage(error) })

    }
}