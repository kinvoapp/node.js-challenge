/**
 * **Service layers**
 * this layer is responsible for receiving information from the control layer
 * and serving the repositories layer.
 */

import MovementRepository from '@repositories/movement.repositories'
import { UpdateWriteOpResult } from 'mongoose'

import { IMovement } from 'types'

/**
 * **createMovement**
 * is an asynchronous function that receives from the control
 * layer the `movement` parameter of type `IMovement`
 * and returns a promise of a created object of type `IMovement`.
 *
 * @param movement is an object of the interface IMovement.
 * @returns { Promise<IMovement>} the promisse of an object create in the database.
 */

async function createMovement (movement: IMovement): Promise<IMovement> {
  return await MovementRepository.createMovement(movement)
}

/**
 * **getMovement**
 * It is an asynchronous function that
 * uses from the repository layer a function that returns a promise with an IMovement array
 * that contains all the results found.
 * @returns {Promise<IMovement[]>} promise with an `IMovement` array that contains all the results found.
 */

async function getMovements (): Promise<IMovement[]> {
  return await MovementRepository.getMovements()
}

/**
 * **getMovement**
 * It is an asynchronous function that receives an `id` parameter
 * that it passes to the getMovement function of the repository layer.
 *
 * @param id is an string.
 * @returns an object promise of type IMovement.
 */

async function getMovement (id: string): Promise<IMovement> {
  return await MovementRepository.getMovement(id)
}

/**
 * **updateMovement**
 * It is an asynchronous function that takes `id` and `movement` as parameters
 * and forwards to the repositories layer.
 * Returns a promise of an updated object of type `UpdateWriteOpResult`.
 *
 * @param id is an string.
 * @param movement is an object from IMovement interface.
 * @returns {Promise<UpdateWriteOpResult>} promise of an updated object of type `UpdateWriteOpResult`.
 */

async function updateMovement (id: string, movement: IMovement): Promise<UpdateWriteOpResult> {
  return await MovementRepository.updateMovement(id, movement)
}

export default {
  createMovement,
  getMovements,
  getMovement,
  updateMovement
}
