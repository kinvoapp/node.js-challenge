import { Hello } from 'types'

async function getHello (msg: string): Promise<Hello> {
  if (msg) return { message: msg }
}

export default { getHello }
