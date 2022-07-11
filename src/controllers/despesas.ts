import { Request, Response } from 'express';
import { Despesas, despesasModel } from '../models/despesas';
import { badRequest, intenalServerError, notFound, validateNumber } from '../services/util';



const insertDespesas = (req: Request, res: Response) =>{

    {
        const despesas = req.body;
        if(!despesas)
        return badRequest(res, 'Id invalido');

        if(!despesas.descricao) 
        return badRequest(res, 'Informe a discrição');

        if(!validateNumber(despesas.valor))
        return badRequest(res, 'informe o valor');

        if(!despesas.data) 
        return badRequest(res, 'informe a data');
    }

   
    const despesas = req.body as Despesas;
    return despesasModel.insertDespesas(despesas)
        .then(despesas => {
            res.json(despesas);
        })
        .catch(err => intenalServerError(res, err));
}


const updateDespesas = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'Id invalido');

        const despesas = req.body;
        if (!despesas)
            return badRequest(res, "Informe a discrição");

        if (!despesas.descricao)
            return badRequest(res, 'informe o valor');

        if (!validateNumber(despesas.valor))
            return badRequest(res, 'Informe o preço');

        const receitasSaved = await despesasModel.getDespesas(id);
        if(!receitasSaved)
            return notFound(res);
    }

    const despesas = req.body as Despesas;
    return despesasModel.updateDespesas(despesas)
        .then(despesas => {
            res.json(despesas)
        })
        .catch(err => intenalServerError(res, err));
}


const listDespesas = ({}: Request, res: Response) => {
    despesasModel.listDespesas()
        .then(despesas => {
            res.json(despesas)
        })
        .catch(err => intenalServerError(res, err));
}

const getDespesas = (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');
    }

    return despesasModel.getDespesas(id)
        .then((despesas) => {
            if(despesas)
                return res.json(despesas);
            else
                return notFound(res);
        })
        .catch(err => intenalServerError(res, err));
}

const deleteDespesas = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    {
        if(!validateNumber(id))
            return badRequest(res, 'id inválido');

        const despesasSaved = await despesasModel.getDespesas(id);
        if(!despesasSaved)
            return notFound(res);
    }

    return despesasModel.deleteDespesas(id)
        .then(() => ok(res))
        .catch(err => intenalServerError(res, err));
}

export const despesasController = {
    insertDespesas,
    listDespesas,
    getDespesas,
    deleteDespesas,
    updateDespesas
}