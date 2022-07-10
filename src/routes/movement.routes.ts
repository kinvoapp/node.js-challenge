/**
 * **Routes Layer**
 * In this layer all the routes and `/movement` parameters that will be used are defined.
 * The handling of data from each endpoint is passed to the control layer.
 */

import express from 'express'
import MovementControllers from '@controllers/movement.controllers'

const router = express.Router()

router.post('/create', MovementControllers.createMovement)
router.get('/', MovementControllers.getMovements)
router.get('/:id', MovementControllers.getMovement)
router.put('/update/:id', MovementControllers.updateMovement)

export default router
