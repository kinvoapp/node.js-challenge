import prisma from "../../../database/client";
import { Transactions } from "@prisma/client";
import { ITransaction } from "@models/transactions";

export const editTransaction = async (transaction: ITransaction): Promise<Transactions> => {
    return new Promise(async (resolve: any, reject: any) => {
        try {
            const { amount, date, type, id } = transaction
            const response = await prisma.transactions.update({
                data: {
                    amount: amount ? BigInt(amount) : undefined,
                    date: date ? new Date(date) : undefined,
                    type: type ? type : undefined
                },
                where: {
                    id
                }
            })

            // if (!response) {
            //     throw Error("Internal Error")
            // }

            resolve(response)

        } catch (error) {

            reject(error)

        }
    })

}
