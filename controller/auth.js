const SignUpAction = require("../actions/signup.action");
const LoginAction = require("../actions/login.action");
const { validationResult } = require("express-validator");
const TokenManager = require("../util/token");
const Response = require("../util/response");

exports.signup = async (req, res, next) => {
  const { email, name, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return Response.error(errors.array()[0].msg, 401, res);
  }

  const user = await SignUpAction.createUser(name, email, password);

  return Response.success("Signup successfully", 201, data, res);
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return Response.error(errors.array()[0].msg, 401, res);
  }

  const user = await LoginAction.login(email, password);

  if (!user) {
    return Response.error("Invalid credentials", 401, res);
  }

  const token = await TokenManager.signToken(user.email, user.id);

  return Response.successWithToken("Login Successfully", 200, user, token, res);
};
