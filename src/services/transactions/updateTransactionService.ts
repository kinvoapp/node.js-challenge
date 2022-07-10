import prisma from "../../database/client";
import { ITransaction } from "@models/transactions";
import { date, mixed, number, object, SchemaOf, string } from 'yup';
import { handleYupError } from "../../utils/yupValidationError";

const editTransactionSchema: SchemaOf<Partial<ITransaction>> = object().shape({
    id: string(),
    amount: number().min(100, "Min value is R$ 1,00"),
    date: date(),
    type: mixed().oneOf<"credit" | "debit">(["credit", "debit"], 'Transaction type must be "credit" or "debit"'),
    created_at: date(),
    updated_at: date(),
    user_id: string().required(),

})

export const editTransaction = async (transaction: ITransaction) => {

    await editTransactionSchema.validate(transaction, {
        abortEarly: false
    }).catch((error) => {
        throw ({ status: 400, message: handleYupError(error) })
    })

    const { amount, date, type, id } = transaction

    return await prisma.transactions.update({
        data: {
            amount: amount ? BigInt(amount) : undefined,
            date: date ? new Date(date) : undefined,
            type: type ? type : undefined
        },
        where: {
            id
        }
    }).catch((error) => {
        throw { status: 500, message: error }
    })

}
