export namespace TokenGenerator {
  export type Input = { key: string }
  export type Output = { accessToken: string }
}
export interface TokenGenerator {
  generate: (params: TokenGenerator.Input) => Promise<TokenGenerator.Output>
}
