import {UpdateUserDto} from '@/internal/dto/user'
import regex from '@/utils/regex'

export default function updateData(id: string, data: UpdateUserDto) {
  let isValid = true

  isValid &&= regex.UUID.test(id)

  if (data.name) {
    const isValidName = typeof data.name === 'string' && data.name.length >= 6
    isValid &&= isValidName
  }

  if (data.email) {
    const isValidEmail = typeof data.email === 'string' && regex.email.test(data.email)
    isValid &&= isValidEmail
  }

  return isValid
}
