import app from './src/index'

const PORT = process.env.PORT || 3000

const HOSTNAME = process.env.HOSTNAME || 'http://localhost'

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})
