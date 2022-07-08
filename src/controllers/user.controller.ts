import { Request, Response } from "express";
import { getUsersService, userCreateService } from "../services/user.service";

export const userCreate = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = await userCreateService(req.body);

    return res.status(201).json({ id });
  } catch (error) {
    return res.status(500);
  }
};

export const getUsers = async (_req: Request, res: Response): Promise<any> => {
  let users;
  try {
    users = await getUsersService();
  } catch (error) {
    return res.status(500);
  }

  return res.status(200).json(users);
};
