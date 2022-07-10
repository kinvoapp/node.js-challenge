import { ITransaction } from "@models/transactions";
import { RequestHandler } from "express";
import { getTransactions } from "../../services/transactions/listTransactionService";

export const listTransactions: RequestHandler = async (req, res) => {
    const user_id = req.userID!
    const { page } = req.params


    await getTransactions(user_id, page).then((response) => {
        let listTransactionsResponse: ITransaction[] = []
        response.forEach((transaction) => {
            const { amount, date, type, created_at, updated_at, id, user_id } = transaction

            listTransactionsResponse.push(
                {
                    user_id,
                    id,
                    amount: amount,
                    date,
                    type,
                    created_at,
                    updated_at

                }
            )
        })

        return res.status(200).json({ data: listTransactionsResponse })
    }).catch((error) => {
        if (error.status) {
            return res.status(error.status).json(error.data)
        }
        return res.status(500).json(error)
    })

}