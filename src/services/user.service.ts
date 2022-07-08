import { User, users } from "../interfaces/user";

export const userCreateService = async (user: User): Promise<object> => {
  users.push(user);

  return { id: users.length };
};

export const getUsersService = async (): Promise<User[]> => {
  return users;
};
