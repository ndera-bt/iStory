const StoryManager = require("../actions/story.action");
const Response = require("../util/response");
const { tryCatch } = require("../util/tryToCatch");

exports.postStory = async (req, res, next) => {
  const { title, body, status } = req.body;

  if (!req.isAuth) {
    return Response.error("Not Authenticated", 403, res);
  }

  const [error, result] = await tryCatch(
    StoryManager.createStory,
    title,
    body,
    status,
    req.userId
  );

  if (error) {
    return Response.error("Unable to create story", 403, res);
  }

  return Response.success("Story added Successfuly", 201, result, res);
};

exports.getStories = async (req, res, next) => {
  const [error, result] = await tryCatch(StoryManager.getStories, null);

  if (error) {
    return Response.error("No stories found", 404, res);
  }

  return Response.success("Stories Found", 200, result, res);
};

exports.getStory = async (req, res, next) => {
  const storyId = req.params.storyId;

  const [error, result] = await tryCatch(StoryManager.getStory, storyId);

  if (error) {
    return Response.error("Cant fetch Story", 404, res);
  }

  return Response.success("Story Found", 200, result, res);
};

exports.postEditStory = async (req, res, next) => {
  const { title, body, status } = req.body;

  const storyId = req.params.storyId;

  if (!req.isAuth) {
    return Response.error("Not Authenticated", 403, res);
  }

  const [error, result] = await tryCatch(
    StoryManager.editStory,
    title,
    body,
    status,
    req.userId,
    storyId
  );

  if (error) {
    return Response.error("Cant Update Story", 401, res);
  }

  return Response.success("Story Updated Successfully", 201, result, res);
};

exports.deleteStory = async (req, res, next) => {
  const storyId = req.params.storyId;

  const userId = req.userId;

  if (!req.isAuth) {
    return Response.error("Not Authenticated", 403, res);
  }

  const [error, result] = await tryCatch(
    StoryManager.deleteStory,
    storyId,
    userId
  );

  if (error) {
    return Response.error("Unable to delete", 401, res);
  }

  return Response.success("Story Deleted successfully", 200, result, res);
};
