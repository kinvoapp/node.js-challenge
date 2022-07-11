import { AppDataSource } from "../data-source";
import { Earning } from "../entities/Earning";

export const earningRepository = AppDataSource.getRepository(Earning);