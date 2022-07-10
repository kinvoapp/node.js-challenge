import { InvalidArgument } from "../domain/error";

export function validateBalance(currentBalance: number, amount: number) {
  if (currentBalance < amount) {
    throw new InvalidArgument("Insufficient funds");
  }
}
