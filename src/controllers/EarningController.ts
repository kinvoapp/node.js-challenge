import { earningRepository } from './../repositories/earningRepository';
import { Request, Response } from "express";

export class EarningController {
    async create(req: Request, res: Response) {
        const { name, value, description } = req.body

        try {
            const newEarning = earningRepository.create({name, value, description});
                
            await earningRepository.save(newEarning);
                
            return res.status(201).json(newEarning);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    //Listar todos os lucros
    async index(req: Request, res: Response): Promise<Response> {
        let earnings = await earningRepository.find()

        return res.json(earnings);
	}

    //Editar lucro
    async updateEarning(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const earning = await earningRepository.findOneBy({ id: Number(id)});

            if(!earning) return res.status(404).json({ message: 'item não existe' });

            const newEarning = req.body;

            if(!newEarning) return res.status(400).json({ message: 'Bad Request' });

            await earningRepository.update(earning, newEarning);
            {
            }
            
            return res.status(201).send();

        } catch (error) {
            console.log(error);
			return res.status(500).json({ message: 'Internal Sever Error' });
        }
    }


    //Excluir lucro
    async deleteEarning(req: Request, res: Response) {
         const { id } = req.params;

         try {
            const earning = await earningRepository.findOneBy({ id: Number(id)});

            if(!earning) return res.status(404).json({ message: 'item não existe' });

            await earningRepository.delete(earning);

            return res.status(200).json({ message: 'Item excluído'});

         } catch (error) {
            console.log(error);
			return res.status(500).json({ message: 'Internal Sever Error' });
         }
   
    }

}