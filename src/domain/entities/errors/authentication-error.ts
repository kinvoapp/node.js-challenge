export class AuthenticationError extends Error {
  constructor () {
    super('Athentication failed')
    this.name = 'AuthenticationError'
  }
}
