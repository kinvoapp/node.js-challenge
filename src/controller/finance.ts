import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Record from '../models/recordModel'



    const addTransaction = (req: Request, res: Response, next: NextFunction) => {
        let {desc, type, value, note} = req.body

        const record = new Record({
            _id: new mongoose.Types.ObjectId(),
            desc,
            type,
            value,
            note
        })
        return record.save()
        .then(result =>{
            return res.status(201).json({
                record: result
            })
        })
        .catch((err) => {
            return err
        })
    }

    const updateTransaction = (req: Request, res: Response, next: NextFunction) => {
        let {id} = req.params

        Record.findByIdAndUpdate(id, req.body)
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
        let {id} = req.params

        Record.findByIdAndDelete(id)
        .then(result =>{
            return res.status(200).json({
                record: result
            })
        })
        .catch((err) => {
            return err
        })
    }
    
     const  loadTransaction = (req: Request, res: Response, next: NextFunction) => {

        Record.find()
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
        Record.find()
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