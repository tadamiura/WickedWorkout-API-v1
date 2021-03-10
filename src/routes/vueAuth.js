const express = require('express')
const { connection } = require('../helper/conf')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secret } = require('../helper/service.js')
const { emailValidator } = require('../helper/auth.service')
const router = express.Router()

const checkUser = (req, res, next) => {
    const { email, password } = req.body

    connection.query('SELECT * FROM user WHERE email = ?', email, (err, result) => {
        if (err) {
            return res.status(500).send(`${err}`)
        } else if(!result[0]) {
            return res.status(409).send('Unknown user')
        }

        const passwordIsValid = bcrypt.compareSync(
            password, result[0].password
          )
        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, token: null })
        }
        req.user = result[0]
        next()
    })
}

const createToken = (req, res, next) => {
    const tokenUserInfo = {
        id: req.user.id,
        nom: req.user.nom,
        email: req.user.email,
        prenom: req.user.prenom
      } 
    const jwtToken = jwt.sign(
        {
            sub: tokenUserInfo.id.toString()
        },
        secret,
        { 
            expiresIn: '24h'
        },
        { 
            algorithm: 'HS256' 
        }
    )
    const user = tokenUserInfo
    if(!jwtToken) {
        throw "error while creating token"
    }
    res.status(200).json({
        user,
        jwtToken
    })
}

router.post('/', emailValidator, checkUser, createToken)

module.exports = router
