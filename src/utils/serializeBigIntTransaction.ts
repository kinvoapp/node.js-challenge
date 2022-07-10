import { ITransaction } from "@models/transactions"

export function serializeBigIntToString(transactions: ITransaction[]) {
    let listTransactionsResponse: ITransaction[] = []
    transactions.forEach((transaction) => {
        const { amount, date, type, created_at, updated_at, id, user_id } = transaction

        listTransactionsResponse.push(
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
    return listTransactionsResponse
}
