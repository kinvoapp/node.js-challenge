import request from 'supertest'
import app from "../../server";
import { ITransaction } from "@models/transactions";
import { IUserData, UserLoginData } from '@models/users';

let token = ""
describe("POST /api/transactions", () => {
    beforeAll(async () => {
        const user: IUserData = {
            email: "teste@testingIntegration.com",
            firstname: "test",
            password: "123"
        }

        await request(app).post('/api/user').send(user).then(async () => {
            const result = await request(app).post('/api/user/authentication').send({ email: user.email, password: user.password })
            token = result.body.data.accessToken
        })
    })
    const sendTransaction: ITransaction = {
        amount: 1500,
        date: new Date("05/10/1991"),
        type: "credit",
        user_id: '1'
    }
    const authenticatedUser: UserLoginData = {
        email: "teste@testing.com",
        password: "123"
    }


    it("Should create transaction", async () => {

        const newTransaction = await request(app).post('/api/transactions').set('Authorization', 'Bearer ' + token).send(sendTransaction)
        expect(newTransaction.body).toEqual({ data: "Transaction created successfully" })
    })

    it("Should not create transaction. Missing token", async () => {
        const sendTransaction: ITransaction = {
            amount: 1500,
            date: new Date("05/10/1991"),
            type: "credit",
            user_id: '1'
        }
        const response = await request(app).post('/api/transactions').send(sendTransaction)
        expect(response.body).toEqual({ error: "No authentication bearer token specified in authorization header." })
    })

})