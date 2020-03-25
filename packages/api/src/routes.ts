const router = require('express').Router()

const { auth, trade } = require('./controllers')

// Auth
router.route('/status').get(auth.getStatus)
router.route('/login').post(auth.login)

// Trade
router.route('/history/:times').get(trade.getHistory)
router.route('/watchlist').get(trade.getWatchlist)
router.route('/securities').get(trade.getSecurity)

module.exports = router
