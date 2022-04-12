const Sequelize = require("sequelize");

const sequelize = new Sequelize("db_name", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
