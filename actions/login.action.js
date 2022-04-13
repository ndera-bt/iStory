const User = require("../model/user");
const PasswordManager = require("../util/password");

class LoginAction {
  static async login(email, password) {
    try {
      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        return false;
      }

      const isEqual = await PasswordManager.verify(password, user.password);

      if (isEqual) {
        return user;
      }
      return false;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = LoginAction;
