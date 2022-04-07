const Story = require('../model/story');
const jwt = require('jsonwebtoken');
const isAuth = require('../middleware/isAuth');

exports.postStory = async (req, res, next) => {
    const title = req.body.title;
    const body = req.body.story;
    const status = req.body.status;
    // check if user is authenticated
    if(!req.isAuth){
        return res.json({message: 'Not Authenticated.'});
    }
    try{
        const story = await Story.create({
            title: title,
            body: body,
            userId: req.userId,
            status: status
        });
        if(!story){
            return res.json({message: 'failed to create story'});
        }
        res.json({message: 'Story added Successfuly', title: title, story_status: status, user: req.userId});

    }catch(err){
        console.log(err);
    }
};

exports.getStories = async (req, res, next) => {
    try{
        // Retrieve all public stories
        const stories = await Story.findAll({where: {status:"public"}});
        if(!stories){
            res.json({message: 'No stories found'});
        }
        res.json({message: 'STORIES', stories: stories});
    }catch(err){
        console.log(err);
    }
};

exports.getStory = async (req, res, next) => {
    const storyId = req.params.storyId;
    try{
        const story = await Story.findByPk(storyId);
        if(!story){
            res.json({message: 'Story No longer exist'});
        }
        // check if story is private
        if(story.status === "private"){
            res.json({message: "story not public"});
        }
        res.json({message: 'Found Story with given Id', story: story});
    }catch(err){
        console.log(err);
    }
};

exports.postEditStory = async (req, res, next) => {
    const storyId = req.params.storyId;
    const newTitle = req.body.title;
    const newBody = req.body.story;
    const status = req.body.status;
    // verify if user is authenticated
    if(!isAuth){
        return res.json({message: 'Not Authenticated'});
    }
    try{
        const story = await Story.findByPk(storyId);
        if(!story){
            res.json({message: 'Story no longer exist'});
        }
        // check if user is author of the story 
        if(story.userId !== req.userId){
            res.json({message: 'Unauthorized'});
        }
        story.title = newTitle;
        story.body = newBody;
        story.userId = req.userId;
        story.status = status;
        const updatedStory = await story.save();
        res.json({message: 'Story Updated successfuly', newTitle: updatedStory.title, story_status: status});
    }catch(err){
        console.log(err);
    }
};

exports.deleteStory = async (req, res, next) => {
    const storyId = req.params.storyId;
    if(!isAuth){
        res.json({message: 'Not Authenticated'});
    }
    try{
        const story = await Story.findByPk(storyId);
        if(!story){
            res.json({message: 'Story no longer exist'});
        }
        // check if user is author of the story
        if(story.userId !== req.userId){
            res.json({message: 'Not Authorized'});
        }
        const deletedStory = await story.destroy();
        if(!deletedStory){
            res.json({message: 'Unable to delete story'});
        }
        res.json({message: 'Story Deleted successfully'});
    }catch(err){
        console.log(err);
    }
};