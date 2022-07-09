const yup = require('./yup');

const schemaCadastroUsuario = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().required().email(),
    senha: yup.string().required().trim().min(6)
});

const schemaLoginUsuario = yup.object().shape({
    email: yup.string().required().email(),
    senha: yup.string().required().trim().min(6)
})

module.exports = {
    schemaCadastroUsuario,
    schemaLoginUsuario
}