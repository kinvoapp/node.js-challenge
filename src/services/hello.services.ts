import HelloRepositories from '@repositories/hello.repositories'

import { Hello } from 'types'

async function getHello (msg: string): Promise<Hello> {
  return await HelloRepositories.getHello(msg)
}

export default { getHello }
