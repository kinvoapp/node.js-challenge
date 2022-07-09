import supertest from 'supertest'

const request = supertest('http://localhost:8080')

describe('must checkt the server', () => {
  // For this test, the server must be started or in development mode.
  test('must check port 8080', async () => {
    const res = await request.get('/hello/Hello%20Word')

    expect(res.status).toBe(200)
    expect(res.body).toStrictEqual({ message: 'Hello Word' })
  })

  test('must check the /movement endpoint', async () => {
    const res = await request.get('/movement')

    expect(res.status).toBe(200)
  })
})
