const StoryManager = require("../actions/story.action");

exports.postStory = async (req, res, next) => {
  const { title, body, status } = req.body;
  // check if user is authenticated
  if (!req.isAuth) {
    return res.status(403).json({
      message: "Not Authenticated.",
      status: false,
      statusCode: res.statusCode,
    });
  }

  const story = await StoryManager.createStory(title, body, status, req.userId);
  if (!story) {
    return res.status(401).json({
      message: "Unable to create story",
      status: false,
      statusCode: res.statusCode,
    });
  }
  res.status(201).json({
    message: "Story added Successfuly",
    status: true,
    statusCode: res.statusCode,
    title: title,
    story_status: status,
  });
};

exports.getStories = async (req, res, next) => {
  const stories = await StoryManager.getStories();

  if (!stories) {
    return res.status(404).json({
      message: "No stories found",
      status: false,
      statusCode: res.statusCode,
    });
  }
  res.status(200).json({ message: "STORIES FOUND", stories: stories });
};

exports.getStory = async (req, res, next) => {
  const storyId = req.params.storyId;
  const story = await StoryManager.getStory(storyId);
  if (!story) {
    return res.status(404).json({
      message: "Cant fetch Story",
      status: false,
      statusCode: res.statusCode,
    });
  }

  res.status(200).json({
    message: "Found Story with given Id",
    status: true,
    statusCode: res.statusCode,
    story: story,
  });
};

exports.postEditStory = async (req, res, next) => {
  const { title, body, status } = req.body;
  const storyId = req.params.storyId;
  // verify if user is authenticated
  if (!req.isAuth) {
    return res.status(403).json({
      message: "Not Authenticated",
      status: false,
      statusCode: res.statusCode,
    });
  }
  const updatedStory = await StoryManager.editStory(
    title,
    body,
    status,
    req.userId,
    storyId
  );
  if (!updatedStory) {
    return res.status(401).json({
      message: "Cant Update Story",
      status: false,
      statusCode: res.statusCode,
    });
  }
  res.json({
    message: "Story Updated successfuly",
    newStory: updatedStory,
  });
};

exports.deleteStory = async (req, res, next) => {
  const storyId = req.params.storyId;
  const userId = req.userId;
  if (!req.isAuth) {
    return res.status(403).json({
      message: "Not Authenticated",
      status: false,
      statusCode: res.statusCode,
    });
  }

  const deletedStory = await StoryManager.deleteStory(storyId, userId);
  if (!deletedStory) {
    return res.status(401).json({
      message: "Unable to delete",
      status: false,
      statusCode: res.statusCode,
    });
  }
  res.status(200).json({
    message: "Story Deleted successfully",
    status: true,
    statusCode: res.statusCode,
  });
};
