const express = require('express')
const { connection } = require('../helper/conf')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secret } = require('../helper/service.js')
const { emailValidator } = require('../helper/auth.service')
const router = express.Router()

router.post('/', (req, res) => {
    const body = req.body
    const user = {
        nom: body.username,
        prenom: body.firstname,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    }
    connection.query('INSERT INTO user SET ?', user, (err, result) => {
        if(err) {
            return res.status(500).json(['Cannot register the user'])
        } else {
            res.sendStatus(201)
        }
    } )
})

module.exports = router