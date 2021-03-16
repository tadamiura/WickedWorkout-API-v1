const express = require('express')
const {
  connection
} = require('../helper/conf.js')
const router = express.Router()
const {
  verifyToken
} = require('../helper/auth.service')


//Get all exercices names
router.get('/', (req, res) => {
  const sql =
    `SELECT id, name, url_name, is_tabata_workout, is_six_workout, is_thirty_thirty_workout
    FROM exercice`
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).send('Erreur dans la récupération des information exercice')
    } else {
      res.send(result)
    }
  })
})

router.get('/back-office', verifyToken, (req, res) => {
  const sql =
    `SELECT id, name, url_name 
  FROM exercice`
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).send('Erreur dans la récupération des information exercice')
    } else {
      res.send(result)
    }
  })
})

//GET exercices for Tabata Workout
router.get('/workouts/tabata', (req, res) => {
  const sql =
    `SELECT id, name, url_name
  FROM exercice
  WHERE is_tabata_workout = 1`
  connection.query(sql, (err, result) => {
    if (err) {
      res.status(500).send('Erreur dans la récupération des information exercice pour le tabata')
    } else {
      res.send(result)
    }
  })
})

//GET exercices for 666 Workout
router.get('/workouts/666', (req, res) => {
  const sql =
    `SELECT id, name, url_name
  FROM exercice
  WHERE is_six_workout = 1`
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send('Erreur dans la récupération des information exercice pour le 666')
    } else {
      res.send(result)
    }
  })
})

//GET exercices for 30/30 Workout
router.get('/workouts/it30', (req, res) => {
  const sql =
    `SELECT id, name, url_name
  FROM exercice
  WHERE is_thirty_thirty_workout = 1`
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send('Erreur dans la récupération des information exercice pour le 30/30')
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

//POST 
//post a new exercice
router.post('/', verifyToken, (req, res) => {
  const formData = req.body
  const sql = `INSERT INTO exercice SET ?`
  connection.query(sql, [formData], (err, result) => {
    if (err) {
      res.status(500).send("Erreur lors de la création d'un exercice")
    } else {
      res.sendStatus(200)
    }
  })
})

//UPDATE
//Update an exercice
router.put('/:id', verifyToken, (req, res) => {
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
router.delete('/:id', verifyToken, (req, res) => {
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

module.exports = router