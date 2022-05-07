const User = require("../model/user");
const Story = require("../model/story");

User.hasMany(Story);

Story.belongsTo(User, { constraint: true, onDelete: "CASCADE" });
