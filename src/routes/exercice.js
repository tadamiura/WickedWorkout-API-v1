const express = require('express')
const { connection } = require('../helper/conf.js')
const router = express.Router()

router.get('/', (req, res) => {
    const sql = 'SELECT name FROM exercices'
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).send('Erreur dans la récupération des information exercice')
        } else {
            res.send(result)
        }
    })
})


module.exports = router