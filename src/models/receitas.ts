import { dbQuery, dbQueryFirst, } from "../services/db";



export type Receitas = {
    id: number;
    descricao: string;    
    valor: number;
    data: Date;
}

const insertReceitas = async (receitas: Receitas) => {
    await dbQuery(`INSERT INTO receitas (descricao, valor, data_receitas) VALUES(?, ?, ?)`, [receitas.descricao, receitas.valor, receitas.data])
    let retorno = await dbQuery(`SELECT seq AS Id FROM sqlite_sequence WHERE  name = 'receitas'`);
    return retorno[0].Id as number | undefined;

}
const updateReceitas = async (receitas: Receitas) => {
    await dbQuery(`UPDATE receitas SET descricao = ?, valor = ?, data = ? WHERE id = ?`,  [receitas.descricao, receitas.valor, receitas.data, receitas.id])
    return getReceitas(receitas.id);
}

const listReceitas = async () => {
    const retorno = await dbQuery(`SELECT * FROM receitas`);
    return retorno as Receitas[];
}

const getReceitas = async (id: number) => {
    const retorno = await dbQueryFirst(`SELECT * FROM receitas WHERE id = ?`, [id]);
    return retorno as Receitas | undefined;
}

const deleteReceitas = async (id: number) => {
    await dbQueryFirst(`DELETE FROM receitas WHERE id = ?`, [id]);
}



export const receitasModel = {
    insertReceitas,
    listReceitas,
    getReceitas,
    updateReceitas,
    deleteReceitas


}