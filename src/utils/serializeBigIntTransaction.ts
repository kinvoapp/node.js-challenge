import { ITransaction } from "@models/transactions"

export function serializeBigIntToString(transactions: ITransaction[]) {
    let listResponse: ITransaction[] = []
    transactions.forEach((transaction) => {
        const { amount, date, type, created_at, updated_at, id, user_id } = transaction

        listResponse.push(
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
    return listResponse
}
