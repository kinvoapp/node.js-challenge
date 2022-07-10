import prisma from "../../database/client";

export const removeTransaction = async (id: string) => {

    if (!id) {
        throw { status: 400, message: "Invalid header params" }
    }

    return await prisma.transactions.delete({
        where: {
            id
        }
    }).catch((error) => {
        throw { status: 500, message: error }
    })



}
