const express = require('express');
const usuarios = require('./controladores/usuarios');
const movimentacoes = require('./controladores/movimentacoes');
const { autenticacao } = require('./intermediarios/autenticacao');

const rotas = express();

rotas.post('/usuario', usuarios.cadastrarUsuario);
rotas.post('/login', usuarios.login);

rotas.use(autenticacao.autenticacao);

rotas.post('/movimentacao', movimentacoes.criarMovimentacao);
rotas.put('/movimentacao/:id', movimentacoes.atualizarMovimentacao);
rotas.delete('/movimentacao/:id', movimentacoes.excluirMovimentacao);
rotas.get('/movimentacao', movimentacoes.listarMovimentacoes);
rotas.get('/movimentacao/saldo', movimentacoes.exibirSaldo);

module.exports = rotas;