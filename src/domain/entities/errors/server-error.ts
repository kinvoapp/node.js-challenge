export class ServerError extends Error {
  constructor () {
    super('An error occured with trying save the data.')
    this.name = 'ServerError'
  }
}
