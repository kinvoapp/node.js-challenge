import { Controller } from '@/application/controller'
import { RequestHandler } from 'express'
type Adapter = (controler: Controller) => RequestHandler

export const adaptEpressRoute: Adapter = controler => async (req, res) => {
  const { statusCode, data } = await controler.handle({ ...req.body })
  const json = statusCode === 200 ? data : { error: data.message }
  res.status(statusCode).json(json)
}
