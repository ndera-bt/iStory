const User = require("../model/user");
const PasswordManager = require("../util/password");

<<<<<<< HEAD
exports.userLogin = async (email, password) => {
  const user = await User.findOne({ where: { email: email } });
=======
class LoginAction {
  static login(email, password) {
    async function userLogin(){
      const user = await User.findOne({ where: { email: email } });
>>>>>>> 5a6b131bf86bba9bccff52202c9f3e2154e5d0c2

  if (!user) {
    throw new Error("Invalid Email");
  }

  const isEqual = await PasswordManager.verify(password, user.password);

<<<<<<< HEAD
  if (isEqual) {
    return user;
=======
      if (isEqual) {
        return user;
      }
      return false;
    }
  return userLogin();
>>>>>>> 5a6b131bf86bba9bccff52202c9f3e2154e5d0c2
  }
  throw new Error("Invalid Password");
};
