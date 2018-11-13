'use strict'

const { join } = require('path')
const express = require('express')
const compression = require('compression')

const app = express()
const PORT = process.env.PORT || 3000

app.use(compression())
app.use(express.static(join(__dirname, 'dist')))

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`))
