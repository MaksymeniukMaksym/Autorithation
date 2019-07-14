const Sequelize = require('sequelize');

const sequelize = new Sequelize({
	database: 'node_db',
	username: 'maks',
	host: '127.0.0.1',
	password: 'Maks3226',
	dialect: 'mysql'
});

sequelize
	.authenticate()
	.then(() => console.log('Database ON.'))
	.catch(err => console.error('Not conect to Datebase', err));

module.exports = sequelize;
