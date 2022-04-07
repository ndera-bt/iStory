const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    try{
        const hashedPw = await bcrypt.hash(password, 12);
        const user = await User.create({
            email: email,
            password: hashedPw,
            name: name,
        });
        console.log('signup successful')
        res.json({message: 'signup successful', userId: user.id});
    }catch(err){
        console.log(err);
    }
};

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let foundUser;
    try{
        const user = await User.findOne({where: {email: email}});
        if(!user){
            res.json({message: 'User not found'});
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual) {
            res.json({message: 'password invalid'});
        }
        foundUser = user;
        const token = jwt.sign({
            email: foundUser.email,
            userId: foundUser.id
        }, 'thisoneissecrete', {expiresIn: '1h'});
        res.json({message: 'login successful', userId: foundUser.id, token: token});
    }catch(err){
    console.log(err);
    }
};