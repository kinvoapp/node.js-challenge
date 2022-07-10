import { ITransaction } from "@models/transactions";
import { Transactions } from "@prisma/client";
import { prismaMock } from "../../database/singleton"
import { addTransaction } from "./createTransactionService";

describe("create transaction", () => {
    const transaction: ITransaction = {
        amount: 150,
        date: new Date("05/10/1991"),
        type: "credit",
        id: '1',
        user_id: '1',
        created_at: new Date(),
        updated_at: new Date()
    }
    afterEach(() => {
        transaction.amount = 150, transaction.date = new Date("05/10/1991"), transaction.type = "credit"
    })
    const { amount, date, type, id, user_id, created_at, updated_at } = transaction

    const mockedTransaction = {
        amount: BigInt(amount), date, type, id, user_id, created_at, updated_at
    } as Transactions

    it("Should create one transaction", async () => {

        prismaMock.transactions.create.mockResolvedValue(mockedTransaction)

        await expect(addTransaction(transaction)).resolves.toEqual(mockedTransaction)


    })

})