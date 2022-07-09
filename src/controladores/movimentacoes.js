const knex = require('../bancodedados/conexao');
const schemaMovimentacoes = require('../validacoes/schemaMovimentacoes');

const criarMovimentacao = async (req, res) => {
    const { descricao, tipo, valor, data } = req.body;

    try {
        await schemaMovimentacoes.schemaCriarMovimentacao.validate(req.body);

        const novaMovimentacao = await knex('movimentacoes').insert({ descricao, tipo, valor, data });

        if (!novaMovimentacao) {
            return res.status(400).json('Não foi possível criar a movimentação.');
        }

        return res.status(200).json('Movimentação criada com sucesso!');

    } catch (error) {
        return res.status(400).json(error.message);
    }

};

const listarMovimentacoes = async (req, res) => {
    const { id } = req.params;

    try {
        const movimentacoes = await knex('movimentacoes').where({ id_usuario: id }).first();

        if (!movimentacoes) {
            return res.status(404).json('Não há movimentações cadastradas');
        };
        return res.status(200).json(movimentacoes);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const atualizarMovimentacao = async (req, res) => {
    const { descricao, tipo, valor, data } = req.body;
    const { id } = req.params;
    const { usuario } = req;

    if (!usuario) {
        return res.status(401).json('Usuário não autenticado!');
    }

    try {

        const buscarMovimentacao = await knex('movimentacoes').where({ id }).first();

        if (!buscarMovimentacao) {
            return res.status(400).json('Não foi possível localizar a movimentação a ser atualizada');
        }

        await schemaMovimentacoes.schemaAtualizarMovimentacao.validate(req.body);

        const movimentacaoAtualizada = await knex('movimentacoes').update({ descricao, tipo, valor, data }).where({ id });

        if (!movimentacaoAtualizada) {
            return res.status(400).json('Não foi possível atualizar a movimentação!');
        }

        return res.status(200).json('Movimentação atualizada com sucesso!');
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const excluirMovimentacao = async (req, res) => {
    const { id } = req.params;

    try {
        const movimentacao = await knex('movimentacoes').where({ id }).first();

        if (!movimentacao) {
            return res.status(404).json('Movimentação não encontrada.');
        }

        const movimentacaoExcluida = await knex('movimentacoes').where({ id }).del();

        if (!movimentacaoExcluida) {
            return res.status(404).json('Não foi possível excluir movimentação.');
        };

        return res.status(202).json('Movimentação excluída com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    };
};

const exibirSaldo = async (req, res) => {

};


module.exports = {
    criarMovimentacao,
    listarMovimentacoes,
    atualizarMovimentacao,
    excluirMovimentacao,
    exibirSaldo
}