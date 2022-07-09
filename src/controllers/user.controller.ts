import { Request, Response } from "express";
const {
  deleteUserService,
  getUsersService,
  getUserByIdService,
  updateUserService,
  userCreateService,
} = require("../services/user.service");

exports.userCreate = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = await userCreateService(req.body);

    return res.status(201).json({ id });
  } catch (error) {
    return res.status(500);
  }
};

exports.getUsers = async (_req: Request, res: Response): Promise<any> => {
  let users;
  try {
    users = await getUsersService();
  } catch (error) {
    return res.status(500);
  }

  return res.status(200).json(users);
};

exports.getUser = async (req: Request, res: Response): Promise<any> => {
  const {
    params: { id },
  } = req;

  try {
    const user = await getUserByIdService(id);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500);
  }
};

exports.updateUser = async (req: Request, res: Response): Promise<any> => {
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

exports.deleteUser = async (req: Request, res: Response): Promise<any> => {
  const {
    params: { id },
  } = req;

  try {
    const deleted = await deleteUserService(id);

    return res.status(200).json(deleted);
  } catch (error) {
    return res.status(500);
  }
};
