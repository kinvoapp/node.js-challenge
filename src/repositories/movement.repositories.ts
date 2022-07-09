/**
 * Repositories Layer
 * this layer is responsible for receiving data from the service layer
 * and treating the information with the database.
 */

import MovementModel from '@models/Movement'
import { IMovement } from 'types'

/**
 * **createMovement**
 * is an asynchronous function that receives from the service
 * layer the `movement` parameter of type `IMovement`
 * and returns a promise of an object created in the database.
 *
 * @param movement is a object of the interface IMovement.
 * @returns {Promise<IMovement>} the promisse of an object create in the database.
 */

async function createMovement (movement: IMovement): Promise<IMovement> {
  return await MovementModel.create(movement)
}

export default { createMovement }
