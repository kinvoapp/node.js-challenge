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
 * @returns {Promise<Response<IMovement, Record<string, IMovement>>>} a promise from an IMovement.
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

/**
 * **getMovements**
 * it is an asynchronous function that does the search of all the movements.
 * Returns a promise from an IMovement array.
 *
 * @param _ is an Request from express.
 * @param res is an Response from express.
 * @param next is an NextFuncion from express.
 * @returns {Promise<Response<IMovement[], Record<string, IMovement[]>>>} a promise from an IMovement array.
 */

async function getMovements (_: Request, res: Response, next: NextFunction): Promise<Response<IMovement[], Record<string, IMovement[]>>> {
  try {
    const movements = await MovementServices.getMovements()

    return res.status(200).json(
      movements.map((e) => {
        return {
          id: e._id,
          type: e.type,
          value: e.value,
          category: e.category,
          date: e.date,
          note: e.note
        }
      })
    )
  } catch (error) {
    res.status(500).json({ error: error.message })
    next(error)
  }
}

/**
 * **getMovement**
 * is an asynchronous function that searches for a movement by its id.
 *
 * @param req is an Request from express.
 * @param res is an Response from express.
 * @param next is an NextFuncion from express.
 * @returns {Promise<Response<IMovement, Record<string, IMovement>>>} a promise from an IMovement.
 */

async function getMovement (req: Request, res: Response, next: NextFunction): Promise<Response<IMovement, Record<string, IMovement>>> {
  const { id } = req.params
  try {
    const movement = await MovementServices.getMovement(id)

    if (!movement) {
      return res.status(422).json({ error: 'movement not found.' })
    }

    return res.status(200).json({
      id: movement._id,
      type: movement.type,
      value: movement.value,
      category: movement.category,
      date: movement.date,
      note: movement.note
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
    next(error)
  }
}

/**
 * **updateMovement**
 * is an asynchronous function that does motion update by its `id`
 * and a new `movement` object of type IMovement.
 *
 * @param req is an Request from express.
 * @param res is an Response from express.
 * @param next is an NextFuncion from express.
 * @returns {Promise<Response<IMovement, Record<string, IMovement>>>} a promise from an IMovement.
 */

async function updateMovement (req: Request, res: Response, next: NextFunction): Promise<Response<IMovement, Record<string, IMovement>>> {
  const { id } = req.params

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

    const movement: IMovement = {
      type,
      value,
      category,
      date,
      note
    }

    const updateMovement = await MovementServices.updateMovement(id, movement)

    if (updateMovement.matchedCount === 0) {
      return res.status(422).json({ error: 'movement not found.' })
    }

    return res.status(201).json({
      id,
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

/**
 * **deleteMovement**
 * is an asynchronous function that does motion deletion by its `id`.
 *
 * @param req is an Request from express.
 * @param res is an Response from express.
 * @param next is an NextFuncion from express.
 * @returns {Promise<Response<IMovement, Record<string, IMovement>>>} a promise from an IMovement.
 */

async function deleteMovement (req: Request, res: Response, next: NextFunction): Promise<Response<IMovement, Record<string, IMovement>>> {
  const { id } = req.params
  try {
    const movement = await MovementServices.getMovement(id)

    if (!movement) {
      return res.status(422).json({ error: 'movement not found.' })
    }

    await MovementServices.deleteMovement(id)

    return res.status(200).json({ message: 'movement removed.' })
  } catch (error) {
    res.status(500).json({ error: error.message })
    next(error)
  }
}

export default {
  createMovement,
  getMovements,
  getMovement,
  updateMovement,
  deleteMovement
}
