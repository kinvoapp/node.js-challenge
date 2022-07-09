/**
 * **Controller layer**
 * this layer is responsible for handling the request and response data
 * and passing this information to the services layer and may or may not return data.
 */

import { Request, Response, NextFunction } from 'express'
import MovementModel from '@models/Movement'
import MovementServices from '@services/movement.services'
import { IMovement } from 'types'

/**
 * **createMovement**
 * is an asynchronous function that takes `req`, `res` and `next` parameters from the Express interfaces.
 * It handles the data and sends it to the services layer.
 *
 * @param req is an Request from express.
 * @param res is an Response from express.
 * @param next is an NextFuncion from express.
 * @returns {Promise<Response<IMovement, Record<string, IMovement>>>} can return status 422 errors or if the request is successful returns an object of type IMovement.
 */
async function createMovement (req: Request, res: Response, next: NextFunction): Promise<Response<IMovement, Record<string, IMovement>>> {
  const {
    type,
    value,
    category,
    date,
    note
  } = req.body

  try {
    if (!type) return res.status(422).json({ error: 'the type field is required' })
    if (type !== 'expense' && type !== 'income') return res.status(422).json({ error: 'unrecognized type' })
    if (!value) return res.status(422).json({ error: 'the value field is required' })
    if (!category) return res.status(422).json({ error: 'the category field is required' })
    if (!date) return res.status(422).json({ error: 'the date field is required' })

    const movement = new MovementModel({
      type,
      value,
      category,
      date,
      note
    })

    await MovementServices.createMovement(movement)

    return res.status(201).json({
      id: movement._id,
      type,
      value,
      category,
      date,
      note
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
    next(error)
  }
}

export default { createMovement }
