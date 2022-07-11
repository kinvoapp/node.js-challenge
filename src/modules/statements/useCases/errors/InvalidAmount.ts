import { AppError } from "../../../../shared/errors/App.Error";

export class InvalidAmount extends AppError {
  constructor() {
    super(
      "Invalid amount! The value must be from R$ 00,01 to R$ 9.999,99 with two decimal places"
    );
  }
}
