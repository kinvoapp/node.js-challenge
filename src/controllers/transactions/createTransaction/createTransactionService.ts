import prisma from "../../../database/client";
import { Transactions } from "@prisma/client";
import { ITransaction } from "@models/transactions";

export const addTransaction = async (transaction: ITransaction): Promise<Transactions> => {
    return new Promise(async (resolve: any, reject: any) => {
        try {

            const { amount, date, type, user_id } = transaction

            const response = await prisma.transactions.create({
                data: {
                    amount: BigInt(amount), date: new Date(date), type, user_id
                }
            })

            if (!response) {
                throw Error("Internal Error")
            }

            resolve(response)

        } catch (error) {

            reject(error)

        }
    })

}
