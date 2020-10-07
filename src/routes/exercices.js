const express = require('express')
const { connection } = require('../helper/conf.js')
const router = express.Router()


//Get all exercices names
router.get('/', (req, res) => {
    const sql = 
    `SELECT id, name 
    FROM exercices`
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
    const sql = 
    `SELECT * FROM exercices 
    WHERE id = ?`
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
    const sql = 
    `SELECT name, exercice_id, url_name, media_type 
    FROM medias 
    JOIN exercices 
    ON exercices.id = exercice_id 
    WHERE exercices.id = ?`
    connection.query(sql, [idExercice], (err, result) => {
      if (err) {
        res.status(500).send("Erreur dans la récupération du média d'un exercice")
      } else {
        res.send(result)
      }
    })
  })

//POST 
//post a new exercice
router.post('/', (req, res) => {
  const formData = req.body
  const sql = `INSERT INTO exercices SET ?`
  connection.query(sql, [formData], (err, result) => {
      if(err){
          res.status(500).send("Erreur lors de la création d'un exercice")
      } else {
        res.sendStatus(200)
      }
  })
})

//post a media of an exercicie
router.post('/:id/medias', (req, res) => {
  const formData = req.body
  const sql1 = `INSERT INTO medias SET ?`
  connection.query(sql1, [formData], (err, results) => {
    if(err) {
      res.status(500).send("Erreur lors de la création d'un média")
    } else {
      const idExercice = req.params.id
      const sql2 = 
      `UPDATE medias 
      SET exercice_id = ? 
      WHERE id = ?`
      connection.query(sql2, [idExercice, results.insertId], (err, results) => {
        if (err) {
          console.log(err)
          res.status(500).send("Erreur dans la création de l'association du média et de son exercice")
        } else {
          res.sendStatus(200)
        }
      })
    }
  })
})

//DELETE
//delete an exercice
router.delete('/:id', (req, res) => {
  const idExercice = req.params.id
  const sql = 
  `DELETE FROM exercices
  WHERE id = ?`
  connection.query(sql, [idExercice], err => {
    if (err) {
      res.status(500).send("Erreur lors de la suppresion d'un exercice")
    } else {
      res.sendStatus(200)
    }
  })
})

module.exports = router