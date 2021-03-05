require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./src/routes/index')
const { verifyToken } = require('./src/helper/auth.service')

app.use(cors())

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use('/api/exercices', routes.Exercices)
app.use('/api/auth', routes.Authentification),
app.use('/api/register', routes.Register)
app.use('/api/users', routes.Users)
app.use('/api/warmups', routes.WarmUps)
//to vue front-end sign up
app.use('/api/vue/user', routes.VueUser)
app.use('/api/vue/auth', routes.VueAuth)

app.get('/api/verify', verifyToken, (req, res) => {
  return res.status(200).send('token verified')
})

module.exports = app;
