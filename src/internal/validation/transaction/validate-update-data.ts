import { UpdateTransactionDto } from "@/internal/dto/transaction";
import regex from "@/utils/regex";

export function updateData(id: string, data: UpdateTransactionDto): boolean {
  let isValid = true;

  const isString = typeof id === "string";
  isValid &&= isString;

  const isUUID = regex.UUID.test(id);
  isValid &&= isUUID;

  if (data.amount) {
    const isNumber = typeof data.amount === "number";
    isValid &&= isNumber;
    const isGreaterThanZero = data.amount > 0;
    isValid &&= isGreaterThanZero;
  }

  if (data.type) {
    const isOfType = data.type === "IN" || data.type === "OUT";
    isValid &&= isOfType;
  }

  return isValid;
}
