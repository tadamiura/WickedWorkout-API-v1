const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { connection } = require('../helper/conf')
const { emailValidator } = require('../services/authService')

const router = express.Router()

const checkUser = (req, res, next) => {
	const mail = req.body.email
	connection.query('SELECT * FROM user WHERE email = ?', mail, (err, result) => {
		if (err) {
			return res.status(500).send('Internal server error')
		} else if (result.length>0) {
			return res.status(409).send('User already exists')
		}
		// If we use register in another goal, we may change or create a const createUser for this variable
		const user = {
		nom: req.body.nom,
		prenom: req.body.prenom,
		email : req.body.email,
		password: bcrypt.hashSync(req.body.password)
		}
		req.user = user
		next()
	})
}

const registerUserDb = (req, res, next) => {
	  connection.query('INSERT INTO user SET ?', req.user, (err, result) => {
			if (err) {
				return res.status(500).send('Cannot register the user')
			}
			connection.query('SELECT id, nom, prenom, email FROM user WHERE id = ?', result.insertId, (err, result) => {
				if (err) {
					return res.status(500).send('Internal server error')
				}
				res.status(200).send(result)
			})   
		})
}

router.post('/', checkUser, emailValidator, registerUserDb) 

module.exports = router