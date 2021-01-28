const express = require('express')
const {
    connection
} = require('../helper/conf.js')
const router = express.Router()
const {
    verifyToken
} = require('../helper/auth.service')

//GET
//Get all users
router.get('/', verifyToken, (req, res) => {
    const sql =
    `SELECT id, prenom, nom, email, num_tel
    FROM user`
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).send('Erreur dans la récupération des utilisateurs')
        } else {
            res.send(result)
        }
    })
})

// Get one user by id
router.get('/:id', verifyToken, (req, res) => {
    const idUser = req.params.id
    const sql =
    `SELECT id, prenom, nom, email, num_tel
    FROM user
    WHERE id = ?`
    connection.query(sql, [idUser], (err, result) => {
        if (err) {
            res.status(500).send("Erreur dans la récupération d'un utilisateur")
        } else {
            res.status(200).send(result[0])
        }
    })
})

//UPDATE
//Update an user
router.put('/:id', verifyToken, (req, res) => {
    const formData = req.body
    const idUser = req.params.id
    const sql =
    `UPDATE user 
    SET ?
    WHERE id = ?`
    connection.query(sql, [formData, idUser], (err, results) => {
        if (err) {
            res.status(500).send("Erreur dans la modification d'un utilisateur")
        } else {
            res.sendStatus(200)
        }
    })
})

//DELETE
//delete an user
router.delete('/:id', verifyToken, (req,res) => {
    const idUser = req.params.id
    const sql = 
    `DELETE FROM user
    WHERE id = ?`
    connection.query(sql, [idUser], err => {
      if (err) {
        res.status(500).send("Erreur lors de la suppresion d'un utilisateur")
      } else {
        res.sendStatus(200)
      }
    })
  })
  

module.exports = router