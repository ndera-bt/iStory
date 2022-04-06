const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        alloNull: false,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        alloNull: false,
    },
    password: {
        type: Sequelize.STRING,
        alloNull: false
    },
    name: {
        type: Sequelize.STRING,
        alloNull: false
    }
});

module.exports = User;