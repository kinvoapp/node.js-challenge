import { User } from "../interfaces/user";

const userModel = require("../models/users.models");

exports.userCreateService = async (user: User): Promise<object> => {
  const users = await userModel.find();

  const id = user.id ? user.id : users.length + 1;

  const userId = await userModel.create({ ...user, id });

  return userId;
};

exports.getUsersService = async (): Promise<User[]> => {
  const users = await userModel.find();

  return users;
};

exports.getUserByIdService = async (id: number): Promise<User[]> => {
  const user = await userModel.find({ id });

  return user;
};

exports.updateUserService = async (id: string, user: User): Promise<object> => {
  const updated = await userModel.findOneAndUpdate(id, user);

  return updated;
};

exports.deleteUserService = async (id: string): Promise<object> => {
  let deleted = await userModel.deleteOne({ id });

  return deleted;
};
