import { Transactions } from "@prisma/client";
import { prismaMock } from "../../../database/singleton"
import { removeTransaction } from "./deleteTransactionService";

describe("delete transaction", () => {
    const transaction: Transactions = {
        amount: BigInt(150),
        date: new Date("05/10/1991"),
        type: "credit",
        id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
    }


    it("Should delete one transaction", async () => {

        prismaMock.transactions.delete.mockResolvedValue(transaction)
        await expect(removeTransaction(transaction.id!)).resolves.toEqual(transaction)

    })

    it("Should not delete a transaction due to Database error", async () => {

        prismaMock.transactions.delete.mockRejectedValue({ error: "Internal Error" })
        await expect(removeTransaction(transaction.id!)).rejects.toEqual({ error: "Internal Error" })


    })
})