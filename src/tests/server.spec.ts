import supertest from 'supertest'

const request = supertest('http://localhost:8080')

test('must check port 8080', async () => {
  const res = await request.get('/Hello%20Word')

  return expect(res.status).toBe(200)
})
