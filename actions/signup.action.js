const User = require("../model/user");

exports.createUser = async (name, email, password) => {
  const user = await User.create({
    email,
    password,
    name,
  });
  return user;
};
