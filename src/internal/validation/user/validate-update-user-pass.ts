import { UpdateUserPassDto } from '@/internal/dto/user'
import regex from '@/utils/regex'

export default function updatePass(id: string, data: UpdateUserPassDto) {
  let isValid = true

  isValid &&= regex.UUID.test(id)
  isValid &&= data.newPassword === data.confirmNewPassword
  isValid &&= regex.password.test(data.newPassword)

  return isValid
}
