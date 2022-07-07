import { Request, Response, NextFunction } from 'express';

interface Post {
    transactionId: Number;
    date: Date;
    value: Number;
    type: String;
}

const addTransaction = async (req: Request, res: Response, next: NextFunction) => {

};

const updateTransaction = async (req: Request, res: Response, next: NextFunction) => {

};

const deleteTransaction = async (req: Request, res: Response, next: NextFunction) => {

};

const loadTransaction = async (req: Request, res: Response, next: NextFunction) => {

};

const loadBalance = async (req: Request, res: Response, next: NextFunction) => {

};



export  { addTransaction, updateTransaction, deleteTransaction, loadTransaction, loadBalance };