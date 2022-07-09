import prisma from "../../../database/client";
import { Transactions } from "@prisma/client";

export const removeTransaction = async (id: string): Promise<Transactions> => {
    return new Promise(async (resolve: any, reject: any) => {
        try {

            const response = await prisma.transactions.delete({
                where: {
                    id
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
