import prisma from "../../database/client";
import { ITransaction } from "@models/transactions";
import { date, mixed, number, object, SchemaOf, string } from 'yup';
import { handleYupError } from "../../utils/yupValidationError";


const addTransactionSchema: SchemaOf<ITransaction> = object().shape({
    id: string(),
    amount: number().required("Amount is required").min(100, "Min value is R$ 1,00"),
    date: date().required('Transaction date is required'),
    type: mixed().oneOf<"credit" | "debit">(["credit", "debit"], 'Transaction type must be "credit" or "debit"').required(),
    created_at: date(),
    updated_at: date(),
    user_id: string().required(),

})

export const addTransaction = async (transaction: ITransaction) => {

    await addTransactionSchema.validate(transaction, {
        abortEarly: false
    }).catch((error) => {
        throw ({ status: 400, message: handleYupError(error) })
    })

    const { amount, date, type, user_id } = transaction

    return await prisma.transactions.create({
        data: {
            amount: BigInt(amount), date: new Date(date), type, user_id
        }
    }).catch((error) => {
        throw { status: 500, message: error }
    })




}
