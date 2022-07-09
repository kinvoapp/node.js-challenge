import { User, users } from "../interfaces/user";

const userModel = require("../models/users.models");

exports.userCreateService = async (user: User): Promise<object> => {
  const id = users.length + 1;

  const userId = await userModel.create({ ...user, id });

  return userId;
};

exports.getUsersService = async (): Promise<User[]> => {
  const users = await userModel.find();

  return users;
};

exports.updateUserService = async (id: string, user: User): Promise<object> => {
  const indexUser = users.findIndex((user) => user.id === Number(id));

  let response = {};

  if (indexUser >= 0) {
    users[indexUser]["name"] = user["name"];
    users[indexUser]["email"] = user["email"];
    users[indexUser]["password"] = user["password"];

    response = user;
  }

  return response;
};

exports.deleteUserService = async (id: string): Promise<object> => {
  const indexUser = users.findIndex((user) => user.id === Number(id));

  let response = {};

  if (indexUser >= 0) {
    users.splice(indexUser, 1);

    response = { deleted: `Usuário de id ${id} deletado com sucesso.` };
  }

  return response;
};
