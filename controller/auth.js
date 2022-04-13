const SignUpAction = require("../actions/signup.action");
const LoginAction = require("../actions/login.action");
const { validationResult } = require("express-validator");
const TokenManager = require("../util/token");

exports.signup = async (req, res, next) => {
  const { email, name, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ message: errors.array()[0].msg });
  }

  const user = await SignUpAction.createUser(name, email, password);

  return res.status(201).json({
    status: true,
    statusCode: res.statusCode,
    message: "Sign up successfully",
    data: user,
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({
      message: errors.array()[0].msg,
      status: failed,
      statusCode: res.statusCode,
    });
  }
  const user = await LoginAction.login(email, password);

  const token = await TokenManager.signToken(user.email, user.id);

  if (!user) {
    res.status(401).json({
      message: "Invalid credentials",
      status: false,
      statusCode: res.statusCode,
    });
  }

  res.status(400).json({
    message: "login successful",
    status: true,
    statusCode: res.statusCode,
    userId: user.id,
    token: token,
  });
};
