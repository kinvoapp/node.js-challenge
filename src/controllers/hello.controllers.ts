import { Request, Response, NextFunction } from 'express'

import HelloService from '@services/hello.services'

import { Hello } from 'types'

async function getHello (req: Request, res: Response, next: NextFunction): Promise<Response<Hello, Record<string, Hello>>> {
  try {
    const msg = req.params.msg

    const hello = await HelloService.getHello(msg)

    if (!hello) return res.status(404).json({ error: 'message not valid.' })

    return res.status(200).json(hello)
  } catch (error) {
    next(error)
  }
}

export default { getHello }
