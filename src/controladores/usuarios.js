const knex = require("../bancodedados/conexao");
const securePassword = require('secure-password');
const jwt = require('jsonwebtoken');
const jwt_secret = require('../jwt_secret');

const pwd = securePassword();

const cadastrarUsuario = async (req, res) => {

};

const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json('É obrigatório informar email e senha');
    }

    try {
        const usuario = await knex('usuarios').where({ email }).first();

        if (!usuario) {
            return res.status(404).json('O usuário não foi encontrado');
        }

        const validarSenha = await pwd.verify(Buffer.from(senha), Buffer.from(usuario.senha, 'hex'));

        switch (validarSenha) {
            case securePassword.INVALID_UNRECOGNIZED_HASH:
            case securePassword.INVALID:
                return res.status(400).json('Email e/ou senha incorretos');
            case securePassword.VALID:
                break;
            case securePassword.VALID_NEEDS_REHASH:
                try {
                    const hash = (await pwd.hash(Buffer.from(senha))).toString('hex');
                    await knex('usuarios').update({ senha: hash, email: email }).where('id', id);
                } catch {
                }
                break;
        }

        const token = jwt.sign({
            id: usuario.id,
            nome: usuario.nome
        }, jwt_secret, { expiresIn: '5h' }
        );

        return res.status(200).json({
            usuario: {
                nome: usuario.nome,
                email: usuario.email,
            },
            token
        });

    } catch (error) {
        return res.status(400).json(error.message);
    }
};

module.exports = {
    cadastrarUsuario,
    login
};