export class EmailInUseError extends Error {
  constructor () {
    super('This email is already taken')
    this.name = 'EmailInUseError'
  }
}
