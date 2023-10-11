import userRepositoryFactory from "@/factory/repository/user";
import findUser from "./find-user";
import createUser from "./create-user";
import deleteUser from "./delete-user";
import updateUser from "./update-user";
import findOneUser from "./find-one-user";
import findUserCount from "./find-count-user";

export const userRepository = userRepositoryFactory({
  find: findUser,
  findOne: findOneUser,
  findCount: findUserCount,
  create: createUser,
  delete: deleteUser,
  update: updateUser,
});
