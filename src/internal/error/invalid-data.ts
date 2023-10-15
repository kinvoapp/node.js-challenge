import {GraphQLError} from 'graphql'

class InvalidDataError extends GraphQLError {
  constructor(message?: string) {
    super(message ?? 'invalid data provided', {
      extensions: {
        code: 'Bad Request'.toUpperCase(),
        http: {status: 400},
      },
    })
  }
}

export default InvalidDataError
