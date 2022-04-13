const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Story = sequelize.define("story", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    alloNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    alloNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    alloNull: false,
  },
  status: {
    type: Sequelize.STRING,
    alloNull: false,
  },
  userId: {
    type: Sequelize.UUID,
    alloNull: false,
  },
});

Story.afterCreate(async (story, options) => {
  delete story.dataValues.id;
  delete story.dataValues.userId;
});

Story.afterUpdate(async (story, options) => {
  delete story.dataValues.id;
  delete story.dataValues.userId;
});

module.exports = Story;
