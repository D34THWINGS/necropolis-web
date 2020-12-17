const express = require('express')
const { join } = require('path')

if (process.env.SERVE_APP) {
  const app = express()
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
  })
  app.use(express.static(join(__dirname, '../../dist')))
  app.listen(process.env.PORT ?? 1234)
}

module.exports = () => {
  // Nothing here for now
}
