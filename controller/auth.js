const { createUser } = require("../actions/signup.action");
const { userLogin } = require("../actions/login.action");
const { validationResult } = require("express-validator");
const TokenManager = require("../util/token");
const Response = require("../util/response");
const { tryCatch } = require("../util/tryToCatch");

exports.signup = async (req, res, next) => {
  const { email, name, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return Response.error(errors.array()[0].msg, 401, res);
  }

  const [error, result] = await tryCatch(createUser, name, email, password);

  if (error) {
    return Response.error("Signup Unsuccessfully, Please try again", 401, res);
  }

  return Response.success("Signup successfully", 201, result, res);
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return Response.error(errors.array()[0].msg, 401, res);
  }

  const [error, result] = await tryCatch(userLogin, email, password);

  if (error) {
    return Response.error("Invalid credentials", 401, res);
  }

  const token = await TokenManager.signToken(result.email, result.id);

  return Response.successWithToken(
    "Login Successfully",
    200,
    result,
    token,
    res
  );
};
