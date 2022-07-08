import { Hello } from '../models/Hello'

test('is should be ok', () => {
  const hello = new Hello()

  hello.message = 'Hello Word!'

  expect(hello.message).toEqual('Hello Word!')
})
