import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { findUserService } from "../services/users/findUserService";
import { config } from '../config/index'

interface IAccessToken {
    id?: string,
}

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: "No authentication bearer token specified in authorization header." })
    }
    if (authorization === "Bearer" || !authorization.includes("Bearer")) {
        return res.status(401).json({ error: "Malformed token" })
    }

    const secret = config.JWT_SECRET!

    const token = authorization.replace("Bearer ", "")

    let user: IAccessToken = {}

    try {
        user = jwt.verify(token, secret) as IAccessToken
    } catch (error) {
        res.status(401).json({ error: "Invalid token" })
    }

    await findUserService(user).then(() => {
        req.userID = user.id
        next()
    }).catch(() => {
        return res.status(401).json({ error: "Access denied" })
    })

}