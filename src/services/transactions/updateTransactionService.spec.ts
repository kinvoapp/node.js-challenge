import { ITransaction } from "@models/transactions";
import { Transactions } from "@prisma/client";
import { prismaMock } from "../../database/singleton"
import { editTransaction } from "./updateTransactionService";

describe("edit transaction", () => {
    const transaction: ITransaction = {
        amount: 150,
        date: new Date("05/10/1991"),
        type: "credit",
        id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
    }
    const { amount, date, type, id, user_id, created_at, updated_at } = transaction

    const mockedTransaction = {
        amount: BigInt(amount), date, type, id, user_id, created_at, updated_at
    } as Transactions

    it("Should edit one transaction", async () => {
        prismaMock.transactions.update.mockResolvedValue(mockedTransaction)
        await expect(editTransaction(transaction)).resolves.toEqual(mockedTransaction)
    })
})