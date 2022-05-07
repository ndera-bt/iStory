require("dotenv").config({ path: ".env" });
const express = require("express");
const User = require("./model/user");
const Story = require("./model/story");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const storyRoutes = require("./routes/story");
const sequelize = require("./config/database");
const Response = require("./util/response");
require("./util/associations");

const app = express();

app.use(bodyParser.json());

app.use(authRoutes);
app.use(storyRoutes);

app.use((error, req, res, next) => {
  return Response.error("An Error Occured", 500, res);
});

module.exports = app;

sequelize
  .sync()
  .then((result) => {
    app.listen(8000);
  })
  .catch((err) => {
    throw new Error(err);
  });
