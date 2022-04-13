const Story = require("../model/story");

class StoryManager {
  static async createStory(title, body, status, userId) {
    try {
      const story = await Story.create({
        title,
        body,
        status,
        userId,
      });
      return story;
    } catch (err) {
      console.log(err);
    }
  }

  static async editStory(title, body, status, userId, storyId) {
    try {
      const story = await Story.findByPk(storyId);
      if (!story || story.userId !== userId) {
        return false;
      }
      story.title = title;
      story.body = body;
      story.userId = userId;
      story.status = status;
      const updatedStory = await story.save();
      return updatedStory;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getStories() {
    try {
      // Retrieve all public stories
      const stories = await Story.findAll({ where: { status: "public" } });
      return stories;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getStory(storyId) {
    try {
      const story = await Story.findByPk(storyId);
      if (!story || story.status === "private") {
        return false;
      }
      return story;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async deleteStory(storyId, userId) {
    try {
      const story = await Story.findByPk(storyId);
      if (!story || story.userId !== userId) {
        return false;
      }
      const deleteStory = await story.destroy();
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = StoryManager;
