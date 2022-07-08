import { Request, Response, NextFunction } from 'express';
import {createRecord, updateRecord, deleteRecord, loadRecord, balanceAmount} from '../repository/index'


    const addTransaction = (req: Request, res: Response, next: NextFunction) => {
        createRecord(req).then(result =>{
            return res.status(201).json({
                record: result
            })
        })
        .catch((err) => {
            return err
        })
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

        loadRecord()
        .then(result =>{
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
                record: result
            })
        })
        .catch((err) => {
            return err
        })
    }




export {addTransaction, updateTransaction, deleteTransaction, loadTransaction, loadBalance}