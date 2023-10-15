import {UpdateUserDto} from '@/internal/dto/user'
import {UserRepository} from '@/internal/interface/repository/user'

export default function updateUser(repository: UserRepository, id: string, data: UpdateUserDto) {}
