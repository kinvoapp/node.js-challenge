import { AppError } from "../../../../shared/errors/App.Error";

export class InvalidByValue extends AppError {
  constructor() {
    super(`Invalid "By" value, it should be "start_date" or "final_date"`);
  }
}
