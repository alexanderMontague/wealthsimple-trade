const router = require('express').Router()

const { auth } = require('./controllers')
const { trade } = require('./controllers')

// Auth
router.route('/status').get(auth.getStatus)
router.route('/login').post(auth.login)

// Trade
router.route('/history:time').get(trade.getHistory)

module.exports = router
