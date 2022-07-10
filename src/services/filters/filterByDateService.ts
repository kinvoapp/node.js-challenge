import { ITransaction } from "@models/transactions";
import prisma from "../../database/client";


export const dateFilterTransactions = async (initialDate: Date, endDate: Date, id: string) => {

    let dates: Record<string, Date> = {}
    if (new Date(initialDate).getTime() > new Date(endDate).getTime()) {
        dates.initialDate = endDate
        dates.endDate = initialDate
    } else {
        dates.initialDate = initialDate
        dates.endDate = endDate
    }

    const getFilteredList = await prisma.transactions.findMany({
        where: {
            user_id: id,
            date: {
                gte: new Date(dates.initialDate),
                lte: new Date(dates.endDate)

            }
        }
    }).then((transactions) => {
        let filteredTransactionResponse: ITransaction[] = []
        transactions.forEach((transaction) => {
            const { amount, date, type, created_at, updated_at, id, user_id } = transaction

            filteredTransactionResponse.push(
                {
                    user_id,
                    id,
                    amount: Number(amount),
                    date,
                    type,
                    created_at,
                    updated_at

                }
            )
        })
        return { data: filteredTransactionResponse }
    }).catch((error) => {
        throw { status: 500, message: error }
    })


    return getFilteredList
}
