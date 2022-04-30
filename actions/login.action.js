const User = require("../model/user");
const PasswordManager = require("../util/password");

class LoginAction {
  static login(email, password) {
    async function userLogin(){
      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        return false;
      }

      const isEqual = await PasswordManager.verify(password, user.password);

      if (isEqual) {
        return user;
      }
      return false;
    }
  return userLogin();
  }
}

module.exports = LoginAction;
