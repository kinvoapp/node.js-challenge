import { AppError } from "../../../../shared/errors/App.Error";

export class InvalidItensPerPageTypeValue extends AppError {
  constructor(minValue: number, maxValue: number) {
    super(
      `Invalid "itensPerPageType" value, it must be between ${minValue} and ${maxValue}`
    );
  }
}
