export interface ITransaction {
    id?: string,
    amount: number,
    type: "credit" | "debit"
    date: Date
    user_id: string
    created_at?: Date
    updated_at?: Date
}
