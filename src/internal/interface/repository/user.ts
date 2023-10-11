import { CreateUserDto, FindUserDto, UpdateUserDto } from "@/internal/dto/user";
import { user } from "@prisma/client";

export interface UserRepository {
  create: (data: CreateUserDto) => Promise<user>;
  find: (data?: FindUserDto) => Promise<user[]>;
  findCount: () => Promise<number>;
  findOne: (id: string) => Promise<user | null>;
  update: (id: string, data: UpdateUserDto) => Promise<user>;
  delete: (id: string) => Promise<user>;
}
