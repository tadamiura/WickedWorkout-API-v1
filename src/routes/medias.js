const express = require('express')
const { connection } = require('../helper/conf.js')
const { route } = require('./exercices.js')
const router = express.Router()


//GET ROUTES
//get all medias
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM media'
    connection.query(sql, (err, result) => {
        if(err) {
            res.status(500).send('Erreur dans la récupération des médias')
        } else {
            res.send(result)
        }
    })
})

// Get one exercice by id
router.get('/:id', (req, res) => {
    const idMedia = req.params.id
    const sql = 
    `SELECT * 
    FROM media 
    WHERE id = ?`
    connection.query(sql, [idMedia], (err, result) => {
      if (err) {
        res.status(500).send("Erreur dans la récupération d'un media")
      } else {
        res.status(200).send(result[0])
      }
    })
  })

module.exports = router