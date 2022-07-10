import prisma from '../../database/client'
import request from 'supertest'
import app from '../../server'
import { IUserData } from '@models/users'

describe("POST /user/register", () => {
    const user: IUserData = {
        email: "createteste@teste.com",
        firstname: "teste",
        password: "1234"
    }
    afterEach(async () => {
        await prisma.user.deleteMany()
    })

    const { email, password, firstname } = user
    it("Should register new user", async () => {
        const response = await request(app).post("/user/register").send(user)
        expect(response.status).toEqual(201)
        expect(response.body.message).toEqual("User registered successfully")

    })

    it("Should not register. Missing email", async () => {
        const user = {
            firstname, password
        }
        const response = await request(app).post("/user/register").send(user)
        expect(response.status).toEqual(404)
        expect(response.body.message).toEqual("E-mail is required")


    })

    it("Should not register. Missing Name", async () => {
        const response = await request(app).post("/user/register").send({
            email, password
        })
        expect(response.status).toEqual(404)
        expect(response.body.message).toEqual("Name is required")

    })

    it("Should not register. Missing password", async () => {
        const response = await request(app).post("/user/register").send({
            email, firstname
        })
        expect(response.status).toEqual(404)
        expect(response.body.message).toEqual("Password is required")

    })

    it("Should not register. E-mail already exist", async () => {
        await request(app).post("/user/register").send(user)
        const response = await request(app).post("/user/register").send(user)
        expect(response.status).toEqual(404)
        expect(response.body.message).toEqual("E-mail already registered")
    })
})
