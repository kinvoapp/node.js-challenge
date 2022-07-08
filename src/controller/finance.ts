import { Request, Response, NextFunction } from 'express';
import transaction from '../models/transaction'


const addTransaction = async (req: Request, res: Response, next: NextFunction) => {

};

const updateTransaction = async (req: Request, res: Response, next: NextFunction) => {

};

const deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {

};

const loadTransaction = async (req: Request, res: Response, next: NextFunction) => {
    const item: transaction = {
            id: 1,
            Date: new Date(),
            value: 150,
            type: "add"
    }
    res.json(item)
};

const loadBalance = async (req: Request, res: Response, next: NextFunction) => {

};



export { addTransaction, updateTransaction, deleteTransaction, loadTransaction, loadBalance };