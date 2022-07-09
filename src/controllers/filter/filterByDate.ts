import { ITransaction } from "@models/transactions";
import { getErrorMessage } from "../../utils/handleErrors";
import prisma from "../../database/client";
import { RequestHandler } from "express";


export const filterByDate: RequestHandler = async (req, res) => {
    const id = '1'
    const { initialDate, endDate } = req.body
    let dates: Record<string, Date> = {}

    if (new Date(initialDate).getTime() > new Date(endDate).getTime()) {
        dates.initialDate = endDate
        dates.endDate = initialDate
    } else {
        dates.initialDate = initialDate
        dates.endDate = endDate
    }


    console.log(new Date(dates.initialDate), new Date(dates.endDate))
    try {
        const getFilteredList = await prisma.transactions.findMany({
            where: {
                user_id: id,
                date: {
                    gte: new Date(dates.initialDate),
                    lte: new Date(dates.endDate)

                }
            }
        })
        console.log(getFilteredList)

        let filteredTransactionResponse: ITransaction[] = []

        getFilteredList.forEach((transaction) => {
            const { amount, date, type, created_at, updated_at, id, user_id } = transaction

            filteredTransactionResponse.push(
                {
                    user_id,
                    id,
                    amount: amount.toString(),
                    date,
                    type,
                    created_at,
                    updated_at

                }
            )
        })

        return res.status(201).send({ data: filteredTransactionResponse })

    } catch (e) {
        return res.status(400).json({ error: getErrorMessage(e) })

    }
}