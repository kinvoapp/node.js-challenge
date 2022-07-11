import { Request, Response } from 'express';
import { Receitas, receitasModel } from '../models/receitas';
import { badRequest, intenalServerError, notFound, ok, validateNumber } from '../services/util';




const insertReceitas = (req: Request, res: Response) => {

    {
        const receitas = req.body;
        if (!receitas)
            return badRequest(res, 'Id invalido');

        if (!receitas.descricao)
            return badRequest(res, 'Informe a discrição');

        if (!receitas.data)
            return badRequest(res, 'informe a data');    

        if (!validateNumber(receitas.valor))
            return badRequest(res, 'informe o valor');
    }


    const receitas = req.body as Receitas;
    return receitasModel.insertReceitas(receitas)
        .then(receitas => {
            res.json(receitas);
        })
        .catch(err => intenalServerError(res, err));
}


const updateReceitas = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    {
        if (!validateNumber(id))
            return badRequest(res, 'Id invalido');

        const receitas = req.body;
        if (!receitas)
            return badRequest(res, "Informe a discrição");

        if (!receitas.descricao)
            return badRequest(res, 'informe o valor');

        if (!validateNumber(receitas.valor))
            return badRequest(res, 'Informe o preço');

            if(!receitas.data) 
        return badRequest(res, 'informe a data');

        const receitasSaved = await receitasModel.getReceitas(id);
        if (!receitasSaved)
            return notFound(res);
    }

    const receitas = req.body as Receitas;
    return receitasModel.updateReceitas(receitas)
        .then(receitas => {
            res.json(receitas)
        })
        .catch(err => intenalServerError(res, err));
}


const listReceitas = ({ }: Request, res: Response) => {
    receitasModel.listReceitas()
        .then(receitas => {
            res.json(receitas)
        })
        .catch(err => intenalServerError(res, err));
}

const getReceitas = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if (!validateNumber(id))
            return badRequest(res, 'id inválido');
    }

    return receitasModel.getReceitas(id)
        .then((receitas) => {
            if (receitas)
                return res.json(receitas);
            else
                return notFound(res);
        })
        .catch(err => intenalServerError(res, err));
}

const deleteReceitas = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if (!validateNumber(id))
            return badRequest(res, 'id inválido');

        const receitasSaved = await receitasModel.getReceitas(id);
        if (!receitasSaved)
            return notFound(res);
    }

    return receitasModel.deleteReceitas(id)
        .then(() => ok(res))
        .catch(err => intenalServerError(res, err));
}

export const receitasController = {
    insertReceitas,
    listReceitas,
    getReceitas,
    deleteReceitas,
    updateReceitas
}