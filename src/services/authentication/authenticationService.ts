import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from "../../config/index"
import { findUserService } from "../users/findUserService"
import { UserLoginData } from '@models/users'
import { object, SchemaOf, string } from 'yup';
import { handleYupError } from '../../utils/yupValidationError'

const userAuthentication: SchemaOf<UserLoginData> = object().shape({
    email: string().required("E-mail is required"),
    password: string().required("Password is required"),
})

export const authenticationService = async (userData: UserLoginData) => {

    const secret = config.JWT_SECRET!

    await userAuthentication.validate(userData, {
        abortEarly: false
    }).catch((error) => {
        throw ({ status: 400, message: handleYupError(error) })
    })

    const user = await findUserService(userData)

    if (!user) {
        throw { status: 400, message: "Invalid email or password" }
    }

    const validatePassword = await bcrypt.compare(userData.password, user.password).catch((error) => {
        throw { status: 400, message: error }
    })

    if (!validatePassword) {
        throw { status: 400, message: "Invalid email or password" }
    }

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1d" })

    return {
        data: {
            accessToken: token,
            id: user.id!
        }
    }

}