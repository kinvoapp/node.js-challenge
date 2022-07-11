import { ITransaction } from "@models/transactions";
import { serializeBigIntToString } from "../../utils/serializeBigIntTransaction";
import prisma from "../../database/client";

export const getTransactions = async (user_id: string, page: string) => {

    const pagination = 5
    const initialPage = Number(page) === 1 ? 0 : (Number(page) - 1) * pagination
    console.log(user_id)
    return await prisma.transactions.findMany({
        skip: initialPage,
        take: pagination,
        where: {
            user_id
        }


    }).then((response) => {
        if (response.length) {
            const newResponse = response as unknown as ITransaction[]
            return (serializeBigIntToString(newResponse))
        }
        return []
    }).catch((error) => {
        throw Promise.reject({ status: 500, message: error })
    })

}
