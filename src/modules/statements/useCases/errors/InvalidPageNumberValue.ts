import { AppError } from "../../../../shared/errors/App.Error";

export class InvalidPageNumberValue extends AppError {
  constructor(minValue: number, maxValue: number) {
    super(
      `Invalid "pageNumber" value, using the request values added, it must be from ${minValue} to ${maxValue}`
    );
  }
}
