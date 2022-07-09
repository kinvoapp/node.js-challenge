import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSessionService } from "../services/CreateSessionService";
import { CreateUserService } from "../services/CreateUserService";



class UsersControllers {

  public async create(request: Request, response: Response): Promise<Response> {
    const { username, email, password } = request.body
    
    const createUserService = container.resolve(CreateUserService)

    const user = await createUserService.execute(username, email, password);

    return response.status(200).json(user)
  }

  public async createSession(request: Request, response: Response) {
    const { email, password } = request.body;

    const createSessionService = container.resolve(CreateSessionService);

    const session = await createSessionService.execute(email, password);

    return response.status(200).json(session)
  }

} export {UsersControllers}