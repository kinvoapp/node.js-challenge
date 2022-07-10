import { Router } from "express";
import { UsersControllers } from "../controllers/UsersController";



const usersRoutes = Router()
const usersController = new UsersControllers()


usersRoutes.post('/', usersController.create)
usersRoutes.post('/login', usersController.createSession)
usersRoutes.get('/:user_id', usersController.show)


export {usersRoutes}