import { userRepository } from '@/repository/user'
import { userService } from '../user'
import { crypt } from '../cryptography'
import InvalidDataError from '@/internal/error/invalid-data'
import { tokenService } from '../token'

export const authServise = {
  async login(email: string, password: string) {
    const user = await userService.findOneUser(userRepository, { email })
    if (!user) throw new InvalidDataError('invalid email or password')
    const isEqualPass = await crypt.compare(password, user.password)
    if (!isEqualPass) throw new InvalidDataError('invalid email or password')

    const token = tokenService.sign({ email: user.email }, user.id)
    return { token }
  },
}
