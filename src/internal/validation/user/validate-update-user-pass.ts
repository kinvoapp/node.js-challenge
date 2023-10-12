import { UpdateUserPassDto } from "@/internal/dto/user";
import regex from "@/utils/regex";

export default function updatePass(data: UpdateUserPassDto) {
  let isValid = true;

  isValid &&= data.newPassword === data.confirmNewPassword;
  isValid &&= regex.password.test(data.newPassword);

  return isValid;
}
