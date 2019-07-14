const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../services/hash.service');
const { getUser, createUser } = require('../services/user.service');
const path = require('path')

const getView = (name) => {
	return path.join(__dirname, `../views/${name}.html`)
}

const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'secretkey';

exports.getHomePage = (req, res) => {
	res.sendFile(getView('home'));
};

exports.getLoginPage = (req, res) => {
	res.sendFile(getView('login'));
};

exports.getSignupPage = (req, res) => {
	res.sendFile(getView('signup'));
};

exports.getUserName = async (req, res) => {

	const { name }  = req.user;
	res.json({ name });
};

exports.login = async (req, res) => {
	try {
		const { name, password } = req.body;

		if (name && password) {
			const user = await getUser({ name });

			if (!user) {
				throw new Error();
			}
			if (await comparePassword(password, user.password)) {
		
				const token = jwt.sign({ id: user.id }, jwtOptions.secretOrKey);
				res.json({
					token,
					status: true,
					
				});
				
			} else {
				throw new Error();
			}
		} else {
			throw new Error();
		}
	} catch (error) {
		res.json({
			status: false
		});
	}
};



exports.signup = async (req, res) => {
	const { name, password } = req.body;

	if (!!name && !!password) {
		const hash = await hashPassword(password);
		const user = await createUser({ name, password: hash });

		console.log(name, password)

		if (user) {
			const token = jwt.sign({ id: user.id }, jwtOptions.secretOrKey );
			
			
			res.json({
				token
				});
		} else {
			throw new Error();
		}
	} else {
		res.status(500).end();
	}
};

exports.logout = (req, res) => {
	//todo logout
	res.redirect('/login');
};
