import { Request, Response } from 'express';
import { dbQuery } from '../services/db';





const listSaldo = async() => {
    const retorno = await dbQuery(`SELECT id, sum(valor) as valor FROM (
        SELECT data, valor
        FROM despesas 
        UNION
        SELECT data, valor
        FROM receitas 
        ) GROUP BY valor`);
    return retorno as [];
}


export const saldoModel = {
    listSaldo,
}