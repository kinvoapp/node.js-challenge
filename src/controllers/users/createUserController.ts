import { IUserData } from "@models/users"
import { Request, Response } from "express"
import { registerUser } from "../../services/users/createUserService"

export const signUp = async (req: Request, res: Response) => {
    const user = req.body as IUserData

    await registerUser(user).then(() => {
        return res.status(201).json({ message: "User registered successfully" })
    }).catch((error) => {
        return res.status(error.status).json({ message: error.message })
    })

}