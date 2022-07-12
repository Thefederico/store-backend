import express from 'express'

import productsRouter from './products.router'

function routesApi (app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/products', productsRouter)
}

export default routesApi
