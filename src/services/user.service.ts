import { User, users } from "../interfaces/user";
import { modelUserCreate } from "../models/users.models";

export const userCreateService = async (user: User): Promise<object> => {
  const id = users.length + 1;

  const userId = await modelUserCreate({ ...user, id });
  // users.push({ ...user, id });

  return userId;
};

export const getUsersService = async (): Promise<User[]> => {
  return users;
};

export const updateUserService = async (
  id: string,
  user: User
): Promise<object> => {
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

export const deleteUserService = async (id: string): Promise<object> => {
  const indexUser = users.findIndex((user) => user.id === Number(id));

  let response = {};

  if (indexUser >= 0) {
    users.splice(indexUser, 1);

    response = { deleted: `Usuário de id ${id} deletado com sucesso.` };
  }

  return response;
};
