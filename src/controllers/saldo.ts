
import { Request, Response } from 'express';
import { saldoModel } from '../models/saldo';
import { badRequest, intenalServerError, notFound, validateNumber } from '../services/util';




const listSaldo = ({}: Request, res: Response) => {
    saldoModel.listSaldo()
        .then(saldo => {
            res.json(saldo)
        })
        .catch(err => intenalServerError(res, err));
}


export const saldoController = {
 
    listSaldo
    
}