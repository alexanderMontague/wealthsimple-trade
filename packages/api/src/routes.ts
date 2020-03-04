const router = require('express').Router()

const { auth } = require('./controllers')

router.route('/login').post(auth.login)

module.exports = router
