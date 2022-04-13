const express = require("express");
const User = require("./model/user");
const Story = require("./model/story");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const storyRoutes = require("./routes/story");
const sequelize = require("./util/database");

const app = express();

app.use(bodyParser.json());

app.use(authRoutes);
app.use(storyRoutes);

// User/Story relationship defination
User.hasMany(Story);
Story.belongsTo(User, { constraint: true, onDelete: "CASCADE" });

sequelize
  .sync()
  .then((result) => {
    console.log("All models synchronized");
    app.listen(8000);
  })
  .catch((err) => {
    throw new Error(err);
  });
