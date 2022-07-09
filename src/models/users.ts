import { IResponse } from "./api"
import { RequestHandler } from "express";
import { ParamsDictionary } from 'express-serve-static-core'


//SignUp
export interface IUserData {
    id?: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string
}
// export type UserRegisterApiMessage = 'Usuário cadastrado com sucesso'

export type UserRegisterAPI = RequestHandler<ParamsDictionary,
    IResponse<IUserData>,
    IUserData>


//Login
export type UserLoginData = Pick<IUserData, 'email' | 'password'>


interface IUserLoginApiResponse {
    id: string;
    accessToken: string;
}

export type UserLoginApi = RequestHandler<
    ParamsDictionary,
    IResponse<IUserLoginApiResponse>,
    UserLoginData>

