const jwt = require("jsonwebtoken");

class TokenManager {
  static signToken(email, userId) {
    async function sign(){
      const token = await jwt.sign(
        {
          email: email,
          userId: userId,
        },
        "tokensecretehere",
        { expiresIn: "1h" }
      );
      return token;
    }
    return sign();
  }
}

module.exports = TokenManager;
