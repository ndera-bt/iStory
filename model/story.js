const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Story = sequelize.define('story', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        alloNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        alloNull: false
    },
    body: {
        type: Sequelize.TEXT,
        alloNull: false
    }
});

module.exports = Story;