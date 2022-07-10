export namespace Encrypter {
  export type Input = { value: string }
  export type Output = { key: string }
}
export interface Encrypter {
  encrypt: (params: Encrypter.Input) => Promise<Encrypter.Output>
}

export namespace Comparator {
  export type Input = { value: string, valueToComoare: string }
  export type Output = boolean
}
export interface Comparator {
  compare: (params: Comparator.Input) => Promise<Comparator.Output>
}
