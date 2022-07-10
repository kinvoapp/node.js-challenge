import { User } from "@prisma/client"
import { prismaMock } from "../../database/singleton"
import { authenticationService } from "./authenticationService"

describe("user authentication", () => {
    const userRef: User = {
        id: '1',
        email: "teste@testing.com",
        firstname: "test",
        password: "123",
        created_at: new Date()
    }

    it("should get token", async () => {
        prismaMock.user.create.mockResolvedValue(userRef)
        userRef.password = "$2b$10$1VFFOO1GacrDJ3nMBqmvnedFw8xuov.qgNmjXJBORBFbO56ZNLQFS"
        prismaMock.user.findFirst.mockResolvedValueOnce(userRef).arguments([{ userData: { password: 123 } }])
        await authenticationService(userRef).then((response) => {
            console.log(response)
        })
    })
})