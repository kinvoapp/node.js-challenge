import dotenv from "dotenv";
import app from './index'

const PORT = process.env.PORT 

const HOSTNAME = process.env.HOSTNAME 

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})
