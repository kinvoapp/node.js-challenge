import { dbQuery, dbQueryFirst,  } from "../services/db";



export type Despesas = {
    id: number;
    descricao: string;    
    valor: number;
    data: string;
    
    
}

const insertDespesas = async (despesas: Despesas) => {
    await dbQuery(`INSERT INTO despesas (descricao, valor, data) VALUES(?, ?, ?)`, [despesas.descricao, despesas.valor, despesas.data])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE  name = 'despesas'`);
   return retorno [0].Id as number | undefined | Date;

}
const updateDespesas = async (despesas: Despesas) => {
    await dbQuery(`UPDATE despesas SET descricao = ?, valor = ?, data = ? WHERE id = ?`, [despesas.descricao, despesas.valor, despesas.data, despesas.id])
    return getDespesas(despesas.id);
}

   const listDespesas = async() => {
       const retorno = await dbQuery(`SELECT * FROM despesas`);
       return retorno as Despesas[];
   }

   const getDespesas = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM despesas WHERE id = ?`, [id]);
    return retorno as Despesas | undefined;
}

const deleteDespesas = async (id: number) => {
    await dbQueryFirst(`DELETE FROM despesas WHERE id = ?`, [id]);
}



export const despesasModel = {
    insertDespesas,
    listDespesas,
    getDespesas,
    deleteDespesas,
    updateDespesas

    
}