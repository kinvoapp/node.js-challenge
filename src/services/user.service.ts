import { User, users } from "../interfaces/user";

export const userCreateService = async (user: User): Promise<number> => {
  users.push(user);

  return users.length;
};

export const getUsersService = async (): Promise<User[]> => {
  return users;
};
