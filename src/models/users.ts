export interface IUserData {
    id?: string,
    firstname: string,
    email: string,
    password: string
}

export type UserLoginData = Pick<IUserData, 'email' | 'password'>

