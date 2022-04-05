const Sequelize = require('sequelize');

const sequelize = new Sequelize('db', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
