export namespace Encrypter {
  export type Input = { value: string }
  export type Output = { key: string }
}
export interface Encrypter {
  encrypt: (params: Encrypter.Input) => Promise<Encrypter.Output>
}
