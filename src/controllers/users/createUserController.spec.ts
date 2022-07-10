import prisma from '../../database/client'
import request from 'supertest'
import app from '../../server'
import { IUserData } from '@models/users'

describe("POST api/user", () => {
    const user: IUserData = {
        id: '1',
        email: "createteste@teste.com",
        firstname: "teste",
        password: "1234"
    }
    beforeEach(async () => {
        await prisma.transactions.deleteMany({})
        await prisma.user.deleteMany({})
    })


    const { email, password, firstname } = user
    it("Should register new user", async () => {
        const response = await request(app).post("/api/user").send(user)
        expect(response.status).toEqual(201)
        expect(response.body.message).toEqual("User registered successfully")

    })

    it("Should not register. Missing email", async () => {
        const user = {
            firstname, password
        }
        const response = await request(app).post("/api/user").send(user)
        expect(response.status).toEqual(400)
        expect(response.body.message).toEqual("E-mail is required")


    })

    it("Should not register. Missing Name", async () => {
        const response = await request(app).post("/api/user").send({
            email, password
        })
        expect(response.status).toEqual(400)
        expect(response.body.message).toEqual("Name is required")

    })

    it("Should not register. Missing password", async () => {
        const response = await request(app).post("/api/user").send({
            email, firstname
        })
        expect(response.status).toEqual(400)
        expect(response.body.message).toEqual("Password is required")

    })

    it("Should not register. E-mail already exist", async () => {
        await request(app).post("/api/user").send(user)
        const response = await request(app).post("/api/user").send(user)
        expect(response.status).toEqual(400)
        expect(response.body.message).toEqual("E-mail already registered")
    })
})
