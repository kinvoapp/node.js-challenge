import prisma from '../../database/client'
import request from 'supertest'
import app from '../../server'
import { IUserData } from '@models/users'


describe("POST /api/user/authentication", () => {
    const user: IUserData = {
        email: "loginteste@teste.com",
        firstname: "teste",
        password: "1234"
    }
    const { email, password } = user

    beforeAll(async () => {
        await request(app).post("/api/user").send(user)
    })

    afterAll(async () => {
        await prisma.transactions.deleteMany({})
        await prisma.user.deleteMany({})
    })

    it("Should authenticate", async () => {
        const response = await request(app).post("/api/user/authentication").send({
            email, password
        })
        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty("data")


    })
    it("Should not login. All fieds are required", async () => {
        const response = await request(app).post("/api/user/authentication").send({})
        expect(response.status).toEqual(400)
        expect(response.body).toEqual({
            message: {
                email: "E-mail is required",
                password: "Password is required"
            }
        })
    })

    it("Should not login. Password missing", async () => {
        const response = await request(app).post("/api/user/authentication").send({ email })
        expect(response.status).toEqual(400)
        expect(response.body).toEqual({
            message: {
                password: "Password is required"
            }
        })
    })

    it("Should not login. Email missing", async () => {
        const response = await request(app).post("/api/user/authentication").send({ password })
        expect(response.status).toEqual(400)
        expect(response.body).toEqual({
            message: {
                email: "E-mail is required"
            }
        })
    })

    it("Should not login. User does not exist", async () => {
        const response = await request(app).post("/api/user/authentication").send({
            email: "user@notexist.com", password
        })
        expect(response.status).toEqual(400)
        expect(response.body).toEqual({ message: "Invalid email or password" })
    })

    it("Should not login. Wrong password", async () => {
        const response = await request(app).post("/api/user/authentication").send({
            email, password: "5326"
        })
        expect(response.status).toEqual(400)
        expect(response.body).toEqual({ message: "Invalid email or password" })
    })

    afterAll(async () => {
        await prisma.user.deleteMany()
    })
})