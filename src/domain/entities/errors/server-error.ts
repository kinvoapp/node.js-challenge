export class ServerError extends Error {
  constructor () {
    super('Internal server Error, try again later or call the suport')
    this.name = 'ServerError'
  }
}
