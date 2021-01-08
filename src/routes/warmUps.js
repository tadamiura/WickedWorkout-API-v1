const express = require('express')
const { connection } = require('../helper/conf.js')
const router = express.Router()
// const { verifyToken } = require('../helper/auth.service')


//Get all warm ups
router.get('/', (req, res) => {
    const sql = 
    `SELECT name
    FROM warm_up`
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).send("Erreur dans la récupération des information de l'échauffement")
        } else {
            res.send(result)
        }
    })
})

//Get a warm up by ID
router.get('/:id', (req, res) => {
    const idWarmUp = req.params.id
    const sql = 
    `SELECT name, url_name 
    FROM warm_up
    WHERE id = ?`
    connection.query(sql, [idWarmUp], (err, result) => {
      if (err) {
        res.status(500).send("Erreur dans la récupération d'un échauffement")
      } else {
        res.status(200).send(result[0])
      }
    })
  })
  
module.exports = router