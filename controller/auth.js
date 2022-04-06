const User = require('../model/user');
const bcrypt = require('bcrypt');

exports.signup = async (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    try{
        const hashedPw = await bcrypt.hash(password, 12);
        const user = await User.create({
            email: email,
            password: hashedPw,
            name: name
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
    const user = await User.findOne({where: {email: email}});
    if(!user){
        res.json({message: 'User not found'});
    }
    const conf = await bcrypt.compare(password, user.password);
    if(!conf) {
        res.json({message: 'password invalid'});
    }
    res.json({message: 'login successful', email: user.email});
};