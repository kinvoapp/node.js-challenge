import { CreateUserDto } from './create-user.dto'

export interface UpdateUserDto extends Partial<Omit<CreateUserDto, 'confirmPassword'>> {}
