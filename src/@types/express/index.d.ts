import { IUserData } from "../../models/users";


declare global {
    namespace Express {
        interface Request {
            userID?: string
        }
    }
}
