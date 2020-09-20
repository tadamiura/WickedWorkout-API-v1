const express = require('express')
const { connection } = require('../helper/conf.js')
const { route } = require('./exercice.js')
const router = express.Router()


//GET ROUTES
//get all medias
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM medias'
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
    const sql = `SELECT * FROM medias WHERE id = ?`
    connection.query(sql, [idMedia], (err, result) => {
      if (err) {
        res.status(500).send("Erreur dans la récupération d'un media")
      } else {
        res.status(200).send(result[0])
      }
    })
  })

//POST 
//post a new media
router.post('/', (req, res) => {
    const formData = req.body
    const sql = `INSERT INTO medias SET ?`
    connection.query(sql, [formData], (err, result) => {
        if(err){
            res.status(500).send("Erreur lors de la création d'un média")
        } else {
            const sql = `SELECT * FROM medias WHERE id = ?`
        connection.query(sql, result.insertId, (err, result) => {
          if(err) {
            res.status(500).send("Erreur lors de la création d'un media")
          } else {
            res.status(201).json(result)
          }
        })
        }
    })
})

module.exports = router