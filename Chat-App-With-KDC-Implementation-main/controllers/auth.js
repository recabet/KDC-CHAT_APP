const User = require("../models/user");

module.exports.GET_Login = (req, res, next) => {
    if(!req.logged_in)
    {
        res.render('login', {page_title : "Login"});
    }
    else 
    {
        req.error_message = "You should log out before logging in.";
        next();
    }
}; 

module.exports.GET_Register = (req, res, next) => {
    if(!req.logged_in)
    {
        res.render('register', {page_title : "Register"});
    }
    else 
    {
        req.error_message = "You should log out before registering.";
        return next();
    }
};

module.exports.POST_Register = (req, res, next) => {
    if(!req.logged_in)
    {
        const username = req.body.username; 
        const password = req.body.password;

        User.findByUsername(username, (existing_user) => {
            if(existing_user)
            {
                req.error_message = "A user with this username already exists. Please go back and try with another username!";
                return next();
            }
            else 
            {
                const new_user = new User(username, password);
                new_user.save((result) => {
                    req.info = "You have successfully registered. You can log in now.";
                    return next();
                });
            }
        });
    }
    else 
    {
        req.error_message = "You should log out before registering.";
        return next();
    }
};

module.exports.POST_Login = (req, res, next) => {
    if(!req.logged_in)
    {
        const username = req.body.username; 
        const password = req.body.password;

        User.findByUsername(username, (user) => {
            if(user && user.password == password)
            {
                req.session.user_id = user.id; 
                req.info = "You have successfully logged in.";
                res.locals.logged_in = true;
                return next();
            }
            else if(user)
            {
                req.info = "Your password is wrong!"; 
                return next();
            }
            else 
            {
                req.error_message = "A user with this username does not exist. Please go back and try with another username!";
                return next();
            }
        });
    }
    else
    {
        req.error_message = "You should log out before logging in.";
        next();
    }
}