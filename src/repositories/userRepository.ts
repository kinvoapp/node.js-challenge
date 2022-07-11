import { User } from "../entities/User";
import { AppDataSource } from "../data-source";

export const userRepository = AppDataSource.getRepository(User);