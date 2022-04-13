const Sequelize = require("sequelize");
const PasswordManager = require("../util/password");
const sequelize = require("../util/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    alloNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    alloNull: false,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    alloNull: false,
  },
  name: {
    type: Sequelize.STRING,
    alloNull: false,
  },
});

User.beforeCreate(async (user, options) => {
  const hashedPassword = await PasswordManager.hash(user.password);
  user.password = hashedPassword;
});

User.afterCreate(async (user, options) => {
  delete user.dataValues.password;
  delete user.dataValues.id;
});

User.afterUpdate(async (user, options) => {
  delete user.dataValues.password;
  delete user.dataValues.id;
});

module.exports = User;
