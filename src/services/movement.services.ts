/**
 * **Service layers**
 * this layer is responsible for receiving information from the control layer
 * and serving the repositories layer.
 */

import MovementRepository from '@repositories/movement.repositories'

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

export default {
  createMovement,
  getMovements
}
