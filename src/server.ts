import app from './app'
import { connect } from 'mongoose'
import 'dotenv/config'

const PORT = process.env.PORT || 8080
const USER = process.env.DB_USER
const PASSWORD = process.env.DB_PASSWORD
const DATABASE = process.env.DB_DATABASE

connect(`mongodb+srv://${USER}:${PASSWORD}@cluster0.fhf0c.mongodb.net/${DATABASE}?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connection successful!')
      console.log(`Open port on http://localhost:${PORT}/`)
      console.log('Server started!')
    })
  })
  .catch((e) => {
    console.log(e.message)
  })
