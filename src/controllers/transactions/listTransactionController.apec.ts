import { Transactions } from "@prisma/client";
import request from 'supertest'
import app from "../../server";
import prisma from "../../database/client";

describe("GET /api/transactions", () => {
    const transactions: Transactions[] = [
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

    beforeAll(async () => {
        transactions.forEach((transactionSet) => {
            prisma.transactions.create({
                data: transactionSet
            })
        })
    })

    it("Should list transactions", async () => {

        const response = await request(app).get('/api/transactions').send()
        expect(response).toEqual(transactions)

    })
})