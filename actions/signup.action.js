const User = require("../model/user");

class SignUpAction {
  static createUser(name, email, password) {
    async function newUser() {
      const user = await User.create({
        email,
        password,
        name,
      });
      return user;
    }
    return newUser();
  }
}

module.exports = SignUpAction;
