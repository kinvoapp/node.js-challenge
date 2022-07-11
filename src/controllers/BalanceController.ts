import { expenseRepository } from './../repositories/expenseRepository';
import { earningRepository } from './../repositories/earningRepository';
import { Request, Response } from "express";

export class BalanceController {
    async index(req: Request, res: Response): Promise<Response> {
        let earnings = await earningRepository.find();
        let expenses = await expenseRepository.find();

        const earningValue = earnings.map(({ value }) => value);
        
        const totalEarnings = earningValue.reduce((a, b) => a + b, 0);
        
        const expenseValue = expenses.map(({ value }) => value);
        
        const totalExpense = expenseValue.reduce((a, b) => a + b, 0);

        let balance = totalEarnings - totalExpense;
        
        return res.json({ message: `Saldo: ${balance}`});
	}
}