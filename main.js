import express from 'express'
import cors from 'cors'

import routesApi from './src/routes/index'
import {
  logErrors,
  errorHandler,
  boomErrorHandler
} from './src/middlewares/error.handler'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const whiteList = ['*']
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('No permitido'))
    }
  }
}
app.use(cors(options))

app.get('/', (req, res) => res.send('Hello World!'))

routesApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () =>
  console.log(`Api listening on http://localhost:${port}/`)
)
