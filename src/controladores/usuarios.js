const knex = require('../bancodedados/conexao');
const securePassword = require('secure-password');
const jwt = require('jsonwebtoken');
const jwt_secret = require('../jwt_secret');
const schemaUsuarios = require('../validacoes/schemaUsuarios');

const pwd = securePassword();

const cadastrarUsuario = async (req, res) => {
    const { nome, senha, email } = req.body;

    try {
        await schemaUsuarios.schemaCadastroUsuario.validate(req.body);

        const buscarEmail = await knex('usuarios').where('email', email).first();

        if (buscarEmail) {
            return res.status(404).json('O email já está em uso.');
        }

        const hash = (await pwd.hash(Buffer.from(senha))).toString('hex');

        const novoUsuario = await knex('usuarios').insert({ nome, senha: hash, email });

        if (!novoUsuario) {
            return res.status(400).json('Não foi possível cadastrar o novo usuário.');
        }

        return res.status(200).json('Usuário cadastrado com sucesso');
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        await schemaUsuarios.schemaLoginUsuario.validate(req.body);

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