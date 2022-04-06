const express = require('express');
const User = require('./model/user');
const Story = require('./model/story');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const storyRoutes = require('./routes/story');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use(authRoutes);
app.use(storyRoutes);

// User/Story relationship defination
User.hasMany(Story);
Story.belongsTo(User, { constraint: true, onDelete: 'CASCADE'});

app.listen(8000);