const express = require('express')
const { connection } = require('../helper/conf.js')
const router = express.Router()


//Get all exercices names
router.get('/', (req, res) => {
    const sql = 
    `SELECT id, name 
    FROM exercice`
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
    `SELECT * FROM exercice
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
  router.get('/:id/medias', (req, res) => {
    const idExercice = req.params.id
    const sql = 
    `SELECT name, exercice_id, url_name, media_type 
    FROM media 
    JOIN exercice 
    ON exercice.id = exercice_id 
    WHERE exercice.id = ?`
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
  const sql = `INSERT INTO exercice SET ?`
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
  const sqlInsert = `INSERT INTO media SET ?`
  connection.query(sqlInsert, [formData], (err, results) => {
    if(err) {
      res.status(500).send("Erreur lors de la création d'un média")
    } else {
      const idExercice = req.params.id
      const sqlUpdate = 
      `UPDATE media 
      SET exercice_id = ? 
      WHERE id = ?`
      connection.query(sqlUpdate, [idExercice, results.insertId], (err, results) => {
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

//UPDATE
//Update an exercice
router.put('/:id', (req,res) => {
  const formData = req.body
  const idExercice = req.params.id
  const sql = 
  `UPDATE exercice 
  SET ?
  WHERE id = ?`
  connection.query(sql, [formData, idExercice], (err, results) => {
    if (err) {
      res.status(500).send("Erreur dans la modification d'un exercice")
    } else {
      res.sendStatus(200)
    }
  })
})

//DELETE
//delete an exercice
router.delete('/:id', (req, res) => {
  const idExercice = req.params.id
  const sql = 
  `DELETE FROM exercice
  WHERE id = ?`
  connection.query(sql, [idExercice], err => {
    if (err) {
      res.status(500).send("Erreur lors de la suppresion d'un exercice")
    } else {
      res.sendStatus(200)
    }
  })
})

//delete a media of an exercice
router.delete('/:id/medias/:media', (req, res) => {
  const values = [
    idExercice = req.params.id,
    idMedia = req.params.media
  ]

  const sql = 
  `DELETE FROM media
  WHERE 1=1
  AND id = ? 
  AND exercice_id = ?`
  
  connection.query(sql, values, err => {
    if (err) {
      res.status(500).send("Erreur dans la suppression du média de l'exercice")
    } else {
      res.sendStatus(200)
    }
  })
})

module.exports = router