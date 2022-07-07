export class NotFound extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, NotFound.prototype);
  }
}
export class InvalidArgument extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, InvalidArgument.prototype);
  }
}
export class InternalServerError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}
