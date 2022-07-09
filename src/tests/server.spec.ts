import supertest from 'supertest'

const request = supertest('http://localhost:8080')

describe('must checkt the server', () => {
  test('must check port 8080', async () => {
    const res = await request.get('/Hello%20Word')

    expect(res.status).toBe(200)
    expect(res.body).toBe({ message: 'Hello Word' })
  })
})
