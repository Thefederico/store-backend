const express = require('express')

const productsRouter = require('./products.router')
const usersRouter = require('./users.router')
const custosmerRouter = require('./customers.router')

function routesApi (app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/products', productsRouter)
  router.use('/users', usersRouter)
  router.use('/customers', custosmerRouter)
}

module.exports = routesApi
