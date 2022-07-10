export namespace Emailvalidator {
  export type Input = { value: string }
  export type Output = boolean
}
export interface Emailvalidator {
  validate: (params: Emailvalidator.Input) => Emailvalidator.Output
}
