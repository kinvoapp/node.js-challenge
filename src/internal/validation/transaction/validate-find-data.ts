import { FindTransactionDto } from "@/internal/dto/transaction";

export function findData(data: FindTransactionDto): boolean {
  let isValid = true;

  const isFirstDateValid = data.initialDate instanceof Date;
  isValid &&= isFirstDateValid;

  const isSecondDateValid = data.finalDate instanceof Date;
  isValid &&= isSecondDateValid;

  return isValid;
}
