import { AppError } from "../../../../shared/errors/App.Error";

export class StatementDoesNotExists extends AppError {
  constructor() {
    super(`Statement not found`, 404);
  }
}
