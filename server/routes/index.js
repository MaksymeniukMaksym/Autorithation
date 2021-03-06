const router = require('express').Router();
const passport = require('passport');

const {
	getHomePage,
	getLoginPage,
	getUserName,
	getSignupPage,
	login,
	signup
} = require('../controllers/auth');

router.get('/home',  getHomePage);

router.get('/getUserName',passport.authenticate('jwt', { session: false }),  getUserName);

router.get('/login', getLoginPage);

router.get('/signup', getSignupPage);

router.post('/login', login);

router.post('/signup', signup);

module.exports = router;
