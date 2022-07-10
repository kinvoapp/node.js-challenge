import { Request, Response, NextFunction } from 'express';
import {createRecord, updateRecord, deleteRecord, loadRecord, balanceAmount} from '../repository/index'
import { calculate } from '../utils/calcBalance';

    const addTransaction = (req: Request, res: Response, next: NextFunction) => {
        const { desc, type, value, note } = req.body 

        try {
            if(!req.body) return res.status(400).json({error: 'your body params are'})
            if(!desc) return res.status(400).json({error: 'the description is required'})
            if(!type) return res.status(400).json({error: 'the type is required'})
            if(!value) return res.status(400).json({error: 'the value is required'})
    
            createRecord(req).then(result =>{
                return res.status(201).json({
                    record: result
                })
            })
            .catch((err) => {
                return err
            })            
        } catch (error) {
            res.status(500).json({error: 'something went wrong.'})
            next()
        }
    }

    const updateTransaction = (req: Request, res: Response, next: NextFunction) => {

        updateRecord(req)
        .then(result =>{
            return res.status(201).json({
                record: result
            })
        })
        .catch((err) => {
            return err
        })
    }
    
    const deleteTransaction = (req: Request, res: Response, next: NextFunction) =>  {

        deleteRecord(req)
        .then(result =>{
            return res.status(200).json({
                record: result
            })
        })
        .catch((err) => {
            return err
        })
    }
    
     const loadTransaction = (req: Request, res: Response, next: NextFunction) => {
    

        loadRecord(req)
        .then(result => {
            return res.status(200).json({
                record: result
            })
        })
        .catch((err) => {
            return err
        })
    }
    
     const loadBalance = (req: Request, res: Response, next: NextFunction) => {
        
        balanceAmount()
        .then(result =>{
            return res.status(200).json({
                balance: calculate(result)
            })
        })
        .catch((err) => {
            return err
        })
    }




export {addTransaction, updateTransaction, deleteTransaction, loadTransaction, loadBalance}