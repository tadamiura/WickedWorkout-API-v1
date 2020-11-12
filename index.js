// const app = require('./app');
const { port } = require('./src/helper/service')
const express = require('express')
const app = express()

app.listen(port, (err) => {
    if (err) {
      throw new Error('Something bad just happened...')
    }
    console.log(`Server is listening on ${port}`)
  })