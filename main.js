const express = require('express')
const cors = require('cors')

const { config } = require('./src/config/config')
const routesApi = require('./src/routes/index')
const {
  logErrors,
  errorHandler,
  boomErrorHandler
} = require('./src/middlewares/error.handler')
const getConnection = require('./src/libs/postgres')

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
app.get('/task', async (req, res) => {
  const client = await getConnection()
  const response = client.query('SELECT * FROM task')
  res.json((await response).rows)
})

routesApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () =>
  console.log(`Api listening on http://localhost:${port}/`)
)
