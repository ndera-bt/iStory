const jwt = require("jsonwebtoken");

class TokenManager {
  static async signToken(email, userId) {
    try {
      const token = jwt.sign(
        {
          email: email,
          userId: userId,
        },
        "tokensecretehere",
        { expiresIn: "1h" }
      );
      return token;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = TokenManager;
