import prisma from "../../database/client"

interface IfindUser {
    id?: string,
    email?: string
}
export const findUserService = async (user: IfindUser) => {

    const userExist = await prisma.user.findFirst({
        where: {
            OR: [
                { email: user.email },
                { id: user.id }
            ]
        }
    })

    if (userExist) {
        return (userExist)
    }
    return (undefined)



}
