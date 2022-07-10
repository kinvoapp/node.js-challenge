import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSessionService } from "../services/CreateSessionService";
import { CreateUserService } from "../services/CreateUserService";
import { ShowUserService } from "../services/ShowUserService";



class UsersControllers {

  public async create(request: Request, response: Response): Promise<Response> {
    const { username, email, password } = request.body
    
    const createUserService = container.resolve(CreateUserService)

    const user = await createUserService.execute(username, email, password);

    return response.status(200).json(user)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const showUserService = container.resolve(ShowUserService);

    const user = await showUserService.execute(user_id);

    return response.status(200).json(user)
  }

  public async createSession(request: Request, response: Response) {
    const { email, password } = request.body;

    console.log(email)

    const createSessionService = container.resolve(CreateSessionService);

    const session = await createSessionService.execute(email, password);

    console.log(session)

    return response.status(200).json(session)
  }

} export {UsersControllers}