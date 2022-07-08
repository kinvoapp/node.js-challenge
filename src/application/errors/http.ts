export class SeverError extends Error {
  constructor (error?: Error) {
    super('Internal server Error, try again later or call the suport')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

export class RequiredField extends Error {
  constructor (fieldname: string) {
    super(`The field ${fieldname} is required`)
    this.name = 'RequiresFied'
  }
}

export class UnauthorizedError extends Error {
  constructor () {
    super('unauthorized')
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends Error {
  constructor () {
    super('Access denied')
    this.name = 'ForbiddenError'
  }
}
