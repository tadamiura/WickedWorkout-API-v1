const express = require('express')
const { connection } = require('../helper/conf')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const { secret } = require('../helper/service.js')
const router = express.Router()

const isLoggedIn = (req, res, next) => {
    try {
        const auth = req.headers.authorization
        if (auth) {
            const token = auth.split(" ")[1]
            const decodedToken = jsonwebtoken.verify(token, secret)
            const sql = `SELECT id, nom, prenom, email FROM user WHERE id = ?`
            connection.query(sql, decodedToken.sub, (err, result) => {
                if (err) {
                    return res.status('400').send('Error to fetch user')
                }
                req.user = result[0]
                next()
            })
        }
    } catch (e) {
        console.log(e)
        next(e)
    }
}

router.get('/current', isLoggedIn, (req, res) => {
    if (req.user) {
        res.json(req.user)
    } else {
        console.log('else end')
        res.end()
    }
})

router.post('/', (req, res) => {
    const body = req.body
    const user = {
        nom: body.username,
        prenom: body.firstname,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    }
    connection.query('INSERT INTO user SET ?', user, (err, result) => {
        if (err) {
            return res.status(500).json(['Cannot register the user'])
        } else {
            res.sendStatus(201)
        }
    })
})

module.exports = router