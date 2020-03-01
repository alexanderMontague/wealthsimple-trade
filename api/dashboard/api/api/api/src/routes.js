const router = require('express').Router();

const { auth } = require('./controllers');

router.route('/login').get(auth.login);

module.exports = router;
