const express = require('express')
const { connection } = require('../helper/conf.js')
const router = express.Router()


//Get all exercices names
router.get('/', (req, res) => {
    const sql = `SELECT id, name FROM exercices`
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).send('Erreur dans la récupération des information exercice')
        } else {
            res.send(result)
        }
    })
})

// Get one exercice by id
router.get('/:id', (req, res) => {
    const idExercice = req.params.id
    const sql = `SELECT * FROM exercices WHERE id = ?`
    connection.query(sql, [idExercice], (err, result) => {
      if (err) {
        res.status(500).send("Erreur dans la récupération d'un exercice")
      } else {
        res.status(200).send(result[0])
      }
    })
  })

  //Get Media of an exercice
  router.get('/:id/media', (req, res) => {
    const idExercice = req.params.id
    const sql = `SELECT name, exercice_id, url_name, media_type FROM medias 
    JOIN exercices ON exercices.id = exercice_id WHERE exercices.id = ?`
    connection.query(sql, [idExercice], (err, result) => {
      if (err) {
        res.status(500).send("Erreur dans la récupération du média d'un exercice")
      } else {
        res.send(result)
      }
    })
  })


module.exports = router