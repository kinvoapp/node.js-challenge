import {Router} from 'express'
const Routes = Router()

Routes.get('/', (req, res) => {
    res.send('Bem-vindo!')
})

export default Routes