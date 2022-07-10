import { Transactions } from "@prisma/client";
import { prismaMock } from "../../database/singleton"
import request from 'supertest'
import app from "../../server";
import { ITransaction } from "@models/transactions";

describe("PUT /api/transactions", () => {

    it("Should edit transaction", async () => {
        const sendTransaction: ITransaction = {
            amount: 1500,
            date: new Date("05/10/1991"),
            type: "credit",
            user_id: '1'
        }
        const { amount, date, type } = sendTransaction
        const prismaTransaction: Transactions = {
            amount: BigInt(amount),
            date,
            type,
            id: '1',
            user_id: 'does-not-exist',
            created_at: new Date(),
            updated_at: new Date()
        }
        prismaMock.transactions.create.mockResolvedValue(prismaTransaction)
        const response = await request(app).post('/api/transactions').send(sendTransaction)
        expect(response.body).toEqual({ data: "Transaction created successfully" })
    })

    it("Should not edit transaction due to database error", async () => {
        const sendTransaction: ITransaction = {
            amount: 1500,
            date: new Date("05/10/1991"),
            type: "credit",
            user_id: '1'
        }
        const { amount, date, type, user_id } = sendTransaction
        const prismaTransaction: Transactions = {
            amount: BigInt(amount),
            date,
            type,
            id: '1',
            user_id,
            created_at: new Date(),
            updated_at: new Date()
        }
        prismaMock.transactions.create.mockRejectedValue(prismaTransaction)
        const response = await request(app).post('/api/transactions').send(sendTransaction)
        expect(response.body).toEqual({ error: "Internal Error" })
    })
})