import {CreateUserDto, FindOneUserDto, FindUserDto, UpdateUserDto} from '@/internal/dto/user'
import {user} from '@prisma/client'

export interface UserRepository {
  create: (data: Omit<CreateUserDto, 'confirmPassword'>) => Promise<user>
  find: (data?: FindUserDto) => Promise<user[]>
  findCount: () => Promise<number>
  findOne: (data: FindOneUserDto) => Promise<user | null>
  update: (id: string, data: UpdateUserDto) => Promise<user>
  delete: (id: string) => Promise<user>
  balance: (id: string) => Promise<number>
}
