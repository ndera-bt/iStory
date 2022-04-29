const Sequelize = require("sequelize");

const sequelize = new Sequelize("istory", "root", "0987654321", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
