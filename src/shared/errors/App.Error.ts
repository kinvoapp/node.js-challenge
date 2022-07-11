export class AppError {
  public readonly statusCode;

  public readonly message;

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
