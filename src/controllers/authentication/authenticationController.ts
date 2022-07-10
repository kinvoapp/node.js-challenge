import { authenticationService } from '../../services/authentication/authenticationService'
import { requestAPI } from '@models/api'
import { IUserData } from '@models/users'


export const signIn: requestAPI<IUserData> = async (req, res) => {
    const user = req.body
    await authenticationService(user).then((userData) => {
        return res.status(200).json(userData)
    }).catch((error) => {
        return res.status(error.status).json({ message: error.message })
    })

}