import { Request, Response } from "express";
import {
  getUsersService,
  updateUserService,
  userCreateService,
} from "../services/user.service";

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

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const {
    params: { id },
  } = req;
  try {
    const update = await updateUserService(id, req.body);

    return res.status(200).json(update);
  } catch (error) {
    return res.status(500);
  }
};
