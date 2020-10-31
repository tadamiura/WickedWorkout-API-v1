require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./src/routes/index')
const { port } = require('./src/helper/service')

app.use(cors())

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use('/api/exercices', routes.Exercices)
app.use('/api/medias', routes.Medias)
app.use('/api/auth', routes.Authentification)




app.listen(port, (err) => {
    if (err) {
      throw new Error('Something bad just happened...')
    }
    console.log(`Server is listening on ${port}`)
  })