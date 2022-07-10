import { User } from "@prisma/client";
import { prismaMock } from "../../database/singleton"
import { registerUser } from "./createUserService";

describe("register user", () => {
    const userRef: User = {
        id: '1',
        email: "test@test502.com",
        firstname: "testname",
        password: "123",
        created_at: new Date()
    }

    beforeEach(async () => {
        prismaMock.user.deleteMany()
    })
    afterEach(() => {
        userRef.id = '1'
        userRef.email = "test@test502.com"
        userRef.firstname = "testname"
        userRef.password = "123"
    })

    it("Should register new user", async () => {
        prismaMock.user.create.mockResolvedValue(userRef)
        await expect(registerUser(userRef)).resolves.toEqual(userRef)

    })
    it("Should not register new user. Missing email", async () => {
        userRef.email = ""
        prismaMock.user.create.mockRejectedValueOnce(userRef)
        await registerUser(userRef).catch((error) => {
            expect(error.message).toEqual("E-mail is required")
        })

    })
    it("Should not register new user. Missing Name", async () => {
        userRef.firstname = ""
        prismaMock.user.create.mockRejectedValueOnce(userRef)
        await registerUser(userRef).catch((error) => {
            expect(error.message).toEqual("Name is required")
        })

    })
    it("Should not register new user. Missing Password", async () => {
        userRef.password = ""
        prismaMock.user.create.mockRejectedValueOnce(userRef)
        await registerUser(userRef).catch((error) => {
            expect(error.message).toEqual("Password is required")
        })

    })
})