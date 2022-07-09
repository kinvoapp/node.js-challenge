import { Router } from "express";
import { UsersControllers } from "../controllers/UsersController";



const usersRoutes = Router()
const usersController = new UsersControllers()


usersRoutes.post('/', usersController.create)


export {usersRoutes}