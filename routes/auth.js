const express = require("express");

const router = express.Router();
const authController = require("../controller/auth");
const { body } = require("express-validator");
const User = require("../model/user");

// POST: endpoint for user signup
router.post(
  "/signup",
  [
    body("email", "Invalid Email Address")
      .normalizeEmail()
      .trim()
      .isLength({ min: 5 })
      .custom(async (value, { req }) => {
        const checkUser = await User.findOne({ where: { email: value } });
        if (checkUser) {
          return Promise.reject("Mail already exist");
        }
      }),
    body("password", "Invalid password").isLength({ min: 5 }).trim(),
    body("name", "Invalid name").trim().isLength({ min: 2 }),
  ],
  authController.signup
);

// POST: endpoint for user login
router.post(
  "/login",
  [
    body("email", "Invalid Email").normalizeEmail().isLength({ min: 5 }),
    body("password", "Invalid Password").trim().isLength({ min: 5 }),
  ],
  authController.login
);

module.exports = router;
