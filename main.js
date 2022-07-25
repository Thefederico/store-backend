const express = require('express')
const cors = require('cors')

const { config } = require('./src/config/config')
const routesApi = require('./src/routes/index')
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler
} = require('./src/middlewares/error.handler')

const app = express()
const port = config.port

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
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () =>
  console.log(`Api listening on http://localhost:${port}/`)
)
