import { Transactions } from "@prisma/client";
import { prismaMock } from "../../database/singleton"
import { getTransactions } from "./listTransactionService";

describe("list transactions", () => {
    const transaction: Transactions[] = [
        {
            amount: BigInt(250),
            date: new Date("05/10/1991"),
            type: "credit",
            id: '1',
            user_id: '1',
            created_at: new Date(),
            updated_at: new Date()
        }, {
            amount: BigInt(250),
            date: new Date("05/10/1991"),
            type: "credit",
            id: '1',
            user_id: '1',
            created_at: new Date(),
            updated_at: new Date()
        }
    ]

    const user_id = '1'
    const page = '5'
    it("Should list transactions with pagination", async () => {

        prismaMock.transactions.findMany.mockResolvedValue(transaction)
        await getTransactions(user_id, page).then((response) => {
            const mockedTransaction = response as unknown as Transactions[]
            mockedTransaction[0].amount = BigInt(response[0].amount)
            mockedTransaction[1].amount = BigInt(response[1].amount)
            expect(mockedTransaction).toEqual(transaction)
        })

    })


})