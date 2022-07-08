import express from 'express'

import HelloController from '@controllers/hello.controllers'

const router = express.Router()

router.get('/:msg', HelloController.getHello)

export default router
