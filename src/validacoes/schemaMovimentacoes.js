const yup = require('yup');

const schemaCriarMovimentacao = yup.object().shape({
    descricao: yup.string().required(),
    tipo: yup.string().required(),
    valor: yup.number().required(),
    data: yup.date().required()
});

const schemaAtualizarMovimentacao = yup.object().shape({
    descricao: yup.string().required(),
    tipo: yup.string().required(),
    valor: yup.number().required(),
    data: yup.date().required()
});

module.exports = {
    schemaCriarMovimentacao,
    schemaAtualizarMovimentacao
};