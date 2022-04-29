const Story = require("../model/story");

class StoryManager {
  static createStory(title, body, status, userId) {
    async function newStory() {
      const story = await Story.create({
        title,
        body,
        status,
        userId,
      });
      return story;
    }
    return newStory();
  }

  static editStory(title, body, status, userId, storyId) {
    async function editedStory() {
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
    }
    return editedStory();
  }

  static getStories() {
    async function retrieveStories() {
      // Retrieve all public stories
      const stories = await Story.findAll({ where: { status: "public" } });
      return stories;
    }
    return retrieveStories();
  }

  static async getStory(storyId) {
    async function retrieveStory() {
      const story = await Story.findByPk(storyId);
      if (!story || story.status === "private") {
        return false;
      }
      return story;
    }
    return retrieveStory();
  }

  static async deleteStory(storyId, userId) {
    async function removeStory() {
      const story = await Story.findByPk(storyId);
      if (!story || story.userId !== userId) {
        return false;
      }
      const deleteStory = await story.destroy();
      return true;
    }
    return removeStory();
  }
}

module.exports = StoryManager;
