import { Request, Response, NextFunction } from 'express';
import transaction from '../models/transaction'
import recordModel from '../repository/recordModel';

export class financeController{
    async addTransaction(req: Request, res: Response, next: NextFunction): Promise<Response> {
      const a = await recordModel.create(req.body)
      return res.json(a)
    }

    async updateTransaction(req: Request, res: Response, next: NextFunction) : Promise<Response> {
        const a = await recordModel.findByIdAndUpdate(req.params.id, req.body)
        return res.json(a)
    }
    
    async deleteTransaction(req: Request, res: Response, next: NextFunction) : Promise<Response> {
        const a = await recordModel.findByIdAndDelete(req.params.id)
        return res.json(a)
    
    }
    
     async loadTransaction(req: Request, res: Response, next: NextFunction) : Promise<Response> {
        const a = await recordModel.find()
        return res.json(a)
    }
    
     async loadBalance(req: Request, res: Response, next: NextFunction) : Promise<Response> {
        const a = await recordModel.find()
        return res.json(a)
    }
}



