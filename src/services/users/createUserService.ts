import prisma from "../../database/client";
import { IUserData } from "@models/users";
import { findUserService } from "./findUserService";
import bcrypt from 'bcrypt'

export const registerUser = async (user: IUserData) => {

    const { email, password, firstname } = user

    if (!email) {
        throw { status: 404, message: "E-mail is required" }

    }

    if (!firstname) {
        throw { status: 404, message: "Name is required" }
    }

    if (!password) {
        throw { status: 404, message: "Password is required" }
    }

    const userExist = await findUserService(user)

    if (userExist) {
        throw { status: 404, message: "E-mail already registered" }
    }

    const encryptedPassword = await bcrypt.hash(password, 10)

    const newUser = { email, password: encryptedPassword, firstname }

    return await prisma.user.create({
        data: newUser
    })

}
