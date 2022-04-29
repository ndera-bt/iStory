const express = require("express");

const router = express.Router();
const storyController = require("../controller/story");
const isAuth = require("../middleware/isAuth");
const Story = require("../model/story");
const { body } = require("express-validator");

// GET: endpoint for getting stories
router.get("/stories", storyController.getStories);

// GET: endpoint for getting a single story
router.get("/story/:storyId", storyController.getStory);

// POST: endpoint for creating a story
router.post(
  "/story",
  isAuth,
  [
    body("title", "Invalid Title").trim().isLength({ min: 2 }),
    body("body", "Invalid story body").isLength({ min: 5 }).trim(),
    body("status", "Invalid status").trim().isLength({ min: 5 }),
  ],
  storyController.postStory
);

// PUT: endpoint for editing a story
router.put(
  "/story/:storyId",
  isAuth,
  [
    body("title", "Invalid Title").trim().isLength({ min: 2 }),
    body("body", "Invalid story body").isLength({ min: 5 }).trim(),
    body("status", "Invalid status").trim().isLength({ min: 5 }),
  ],
  storyController.postEditStory
);

// DELETE: endpoint for deleting a story
router.delete("/story/:storyId", isAuth, storyController.deleteStory);

module.exports = router;
