import { Request, Response } from 'express';
import { dbQuery } from '../services/db';





const listSaldo = async() => {
    const retorno = await dbQuery(`SELECT data, sum(valor) as valor FROM (
        SELECT data, valor
        FROM despesas 
        UNION
        SELECT data, valor
        FROM receitas 
        ) GROUP BY data`);
    return retorno as [];
}


export const saldoModel = {
    listSaldo,
}