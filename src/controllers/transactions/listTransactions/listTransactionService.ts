import prisma from "../../../database/client";
import { Transactions } from "@prisma/client";
import { ITransaction } from "@models/transactions";

export const getTransactions = async (user_id: string, page: string): Promise<Transactions[]> => {
    return new Promise(async (resolve: any, reject: any) => {
        try {
            const pagination = 5
            const initialPage = Number(page) === 1 ? 0 : (Number(page) - 1) * pagination

            const getTransactionList = await prisma.transactions.findMany({
                skip: initialPage,
                take: pagination,
                where: {
                    user_id
                }

            })
            resolve(getTransactionList)

        } catch (error) {

            reject(error)

        }
    })

}
