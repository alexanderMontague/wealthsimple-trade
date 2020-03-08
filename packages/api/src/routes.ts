const router = require('express').Router()

const { auth } = require('./controllers')

// Auth
router.route('/status').get(auth.getStatus)
router.route('/login').post(auth.login)

module.exports = router
