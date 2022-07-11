import { Request, Response } from "express";
import { expenseRepository } from "../repositories/expenseRepository";

export class ExpenseController {
    async create(req: Request, res: Response) {
            const { name, value, description } = req.body

            try {
                const newExpense = expenseRepository.create({name, value, description});
                
                await expenseRepository.save(newExpense);
                
                return res.status(201).json(newExpense);
            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: 'Internal Server Error'} );
            }
    }

    //listar despesas
    async index(req: Request, res: Response): Promise<Response> {
        let expenses = await expenseRepository.find()

        return res.json(expenses);
	}

    //Editar despesa
    async updateExpense(req: Request, res: Response) {
        const { id } = req.params

        try {
            const expense = await expenseRepository.findOneBy({ id: Number(id)})

            if(!expense) return res.status(404).json({ message: 'item não existe' })

            const newExpense = req.body

            if(!newExpense) return res.status(400).json({ message: 'Bad Request' })

            await expenseRepository.update(expense, newExpense);

            
            return res.status(201).send();

        } catch (error) {
            console.log(error)
			return res.status(500).json({ message: 'Internal Sever Error' })
        }
    }

        //Excluir despesa
        async deleteExpense(req: Request, res: Response) {
            const { id } = req.params;
   
            try {
               const expense = await expenseRepository.findOneBy({ id: Number(id)});
   
               if(!expense) return res.status(404).json({ message: 'item não existe' });
   
               await expenseRepository.delete(expense);
   
               return res.status(200).json({ message: 'Item excluído'});
   
            } catch (error) {
               console.log(error);
               return res.status(500).json({ message: 'Internal Sever Error' });
            }
      
       }


}