const sequelize = require('../db/connection');
const Sequelize = require('sequelize');

const User = sequelize.define('user', {
	name: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	}
});

User.sync().then(() => console.log('"user" table created '));

module.exports = User;
