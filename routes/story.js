const express = require('express');

const router = express.Router();
const storyController = require('../controller/story');
const isAuth = require('../middleware/isAuth');

// GET: endpoint for getting stories
router.get('/stories', storyController.getStories);

// GET: endpoint for getting a single story
router.get('/story/:storyId', storyController.getStory);

// POST: endpoint for creating a story
router.post('/story', isAuth, storyController.postStory);

// PUT: endpoint for editing a story
router.put('/story/:storyId', isAuth, storyController.postEditStory);

// DELETE: endpoint for deleting a story
router.delete('/story/:storyId', isAuth, storyController.deleteStory);

module.exports = router;