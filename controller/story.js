const StoryManager = require("../actions/story.action");
const Response = require("../util/response");

exports.postStory = async (req, res, next) => {
  const { title, body, status } = req.body;

  if (!req.isAuth) {
    return Response.error("Not Authenticated", 403, res);
  }

  const story = await StoryManager.createStory(title, body, status, req.userId);
  if (!story) {
    return Response.error("Unable to create story", 403, res);
  }
  return Response.success("Story added Successfuly", 201, story, res);
};

exports.getStories = async (req, res, next) => {
  const stories = await StoryManager.getStories();

  if (!stories) {
    return Response.error("No stories found", 404, res);
  }

  return Response.success("Stories Found", 200, stories, res);
};

exports.getStory = async (req, res, next) => {
  const storyId = req.params.storyId;

  const story = await StoryManager.getStory(storyId);

  if (!story) {
    return Response.error("Cant fetch Story", 404, res);
  }

  return Response.success("Story Found", 200, story, res);
};

exports.postEditStory = async (req, res, next) => {
  const { title, body, status } = req.body;

  const storyId = req.params.storyId;

  if (!req.isAuth) {
    return Response.error("Not Authenticated", 403, res);
  }

  const updatedStory = await StoryManager.editStory(
    title,
    body,
    status,
    req.userId,
    storyId
  );

  if (!updatedStory) {
    return Response.error("Cant Update Story", 401, res);
  }

  return Response.success("Story Updated Successfully", 201, updatedStory, res);
};

exports.deleteStory = async (req, res, next) => {
  const storyId = req.params.storyId;

  const userId = req.userId;

  if (!req.isAuth) {
    return Response.error("Not Authenticated", 403, res);
  }

  const deletedStory = await StoryManager.deleteStory(storyId, userId);

  if (!deletedStory) {
    return Response.error("Unable to delete", 401, res);
  }

  return Response.success(
    "Story Deleted successfully",
    200,
    (data = null),
    res
  );
};
