const jwt = require("jsonwebtoken");

class TokenManager {
  static async signToken(email, userId) {
    const token = await jwt.sign(
      {
        userId: userId,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY_TIME }
    );

    return token;
  }
}

module.exports = TokenManager;
