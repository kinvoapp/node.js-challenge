/**
 * Repositories Layer
 * this layer is responsible for receiving data from the service layer
 * and treating the information with the database.
 */

import MovementModel from '@models/Movement'
import { UpdateWriteOpResult } from 'mongoose'
import { IMovement } from 'types'

/**
 * **createMovement**
 * is an asynchronous function that receives from the service
 * layer the `movement` parameter of type `IMovement`
 * and returns a promise of an object created in the database.
 *
 * @param movement is an object from IMovement interface.
 * @returns {Promise<IMovement>} the promisse of an object create in the database.
 */

async function createMovement (movement: IMovement): Promise<IMovement> {
  return await MovementModel.create(movement)
}

/**
 * **getMovements**
 * It is an asynchronous function
 * that returns a promise with an `IMovement` array that contains all the results found.
 *
 * @returns {Promise<IMovement[]>} promise with an `IMovement` array that contains all the results found.
 */

async function getMovements (): Promise<IMovement[]> {
  return await MovementModel.find()
}

/**
 * **getMovement**
 * It is an asynchronous function that takes an `id` parameter
 * and returns an object promise of type IMovement.
 *
 * @param id is an string.
 * @returns {Promise<IMovement>} an object promise of type IMovement.
 */

async function getMovement (id: string): Promise<IMovement> {
  return await MovementModel.findById(id)
}

/**
 * **updateMovement**
 * It is an asynchronous function that takes `id` and `movement` as parameters.
 * Returns a promise of an updated object of type `UpdateWriteOpResult`.
 *
 * @param id is an string.
 * @param movement is an object from IMovement interface.
 * @returns {Promise<UpdateWriteOpResult>} promise of an updated object of type `UpdateWriteOpResult`.
 */

async function updateMovement (id: string, movement: IMovement): Promise<UpdateWriteOpResult> {
  return await MovementModel.updateOne({ _id: id }, movement)
}

export default {
  createMovement,
  getMovements,
  getMovement,
  updateMovement
}
