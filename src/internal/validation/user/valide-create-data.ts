import { CreateUserDto } from '@/internal/dto/user'
import regex from '@/utils/regex'

export default function createData(data: CreateUserDto) {
  let isValid = true

  const isValidName = typeof data.name === 'string' && data.name.length >= 6
  isValid &&= isValidName

  const isValidEmail = typeof data.email === 'string' && regex.email.test(data.email)
  isValid &&= isValidEmail

  const isValidPass = data.password === data.confirmPassword && regex.password.test(data.password)
  isValid &&= isValidPass

  return isValid
}
