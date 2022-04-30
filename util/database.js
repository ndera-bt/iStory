const Sequelize = require("sequelize");

const sequelize = new Sequelize("db_name", "root", "db_password", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
