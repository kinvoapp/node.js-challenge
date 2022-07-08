export namespace Encrypter {
  export type Input = { password: string }
  export type Output = { key: string }
}
export interface Encrypter {
  encrypt: (params: Encrypter.Input) => Promise<Encrypter.Output>
}
