const express = require('express');

const router = express.Router();
const storyController = require('../controller/story');

//endpoint for getting stories
router.get('/stories', storyController.getStories);

// endpoint for getting a single story
router.get('/story/:storyId', storyController.getStory);

// endpoint for creating a story
router.post('/story', storyController.postStory);

// endpoint for editing a story
router.put('/story/:storyId', storyController.postEditStory);

// endpoint for deleting a story
router.delete('/story/:storyId', storyController.deleteStory);

module.exports = router;