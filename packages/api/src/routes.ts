const router = require('express').Router()

const { auth, trade } = require('./controllers')

// Auth
router.route('/status').get(auth.getStatus)
router.route('/login').post(auth.login)

// Trade
router.route('/history/:times').get(trade.getHistory)
router.route('/watchlist').get(trade.getWatchlist)
router.route('/watchlist/:security_id').put(trade.editWatchlist)
router.route('/watchlist/:security_id').delete(trade.editWatchlist)
router.route('/securities').get(trade.searchSecurity)
router.route('/securities/:security_id').get(trade.getSecurity)
router
  .route('/securities/:security_id/historical_quotes/:time')
  .get(trade.getSecurity)

module.exports = router
