const User = require("../model/user");

class SignUpAction {
  static async createUser(name, email, password) {
    try {
      const user = await User.create({
        email,
        password,
        name,
      });
      if (!user) {
        return false;
      }
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = SignUpAction;
