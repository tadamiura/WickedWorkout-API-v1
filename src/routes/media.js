const express = require('express')
const { connection } = require('../helper/conf.js')
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

module.exports = router