/**
 * Module dependencies.
 */
const express = require('express')
const compression = require('compression')
const session = require('express-session')
const bodyParser = require('body-parser')
const logger = require('morgan')
const chalk = require('chalk')
const errorHandler = require('errorhandler')
const dotenv = require('dotenv')
const flash = require('express-flash')
const path = require('path')
const expressValidator = require('express-validator')
const expressStatusMonitor = require('express-status-monitor')
const multer = require('multer')
const cors = require('cors')
const axiosLogger = require('axios-debug-log')

const upload = multer({ dest: path.join(__dirname, 'uploads') })

// middleware import
const {
  tokens: { checkTokens },
} = require('./src/middleware')

// Axios Logging
axiosLogger({
  request: (debug, config) =>
    debug(
      `[${config.method.toUpperCase()}] | ${
        config.url
      } | DATA: ${JSON.stringify(config?.data)} | HEADERS: ${JSON.stringify(
        config.headers
      )}`
    ),
  response: (debug, response) => {
    const data = JSON.stringify(response?.data)
    debug(`[RESPONSE] | DATA: ${data.substring(0, 300)}...`)
  },
  error: (debug, error) =>
    debug(
      `[ERROR] | Message: ${error.message} | Reason: ${error.response?.data?.error}`
    ),
})

/**
 * Load environment variables from .env file
 */
dotenv.load({ path: '.env' })

/**
 * Get Routes
 */
const routes = require('./src/routes')

/**
 * Setup / Initialization
 */
const app = express()
const BASE_URL = '/api/v1'

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3334)
app.use(expressStatusMonitor())
app.use(compression())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator())
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 3.6e6, httpOnly: false, secure: false }, // expires after 1 hour
  })
)
app.use(flash())
app.disable('x-powered-by')

app.use((req, res, next) => {
  // Refresh user cookie with every request
  req.session._garbage = Date()
  req.session.touch()
  next()
})

// cors middleware
app.use(cors())

// set token middleware
app.use(checkTokens)

// set routes
app.use(BASE_URL, routes)

/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler())
} else {
  app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send('Server Error')
  })
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log(
    '%s App is running at http://localhost:%d in %s mode',
    chalk.green('✓'),
    app.get('port'),
    app.get('env')
  )
  console.log('Press CTRL-C to stop\n')
})

module.exports = app
