const User = require('../models/user'); 

module.exports.SEND_Info = (req, res, next) => {
    if(req.info)
    {
        res.render('info', {page_title : "Info", info : req.info}); 
    }
    else
    {
        return next();
    }
}

module.exports.SEND_Error_Page = (req, res, next) => {
    if(req.error_message)
    {
        res.render('error', {page_title : "Error", error_message : req.error_message});
    }
    else 
    {
        res.status(404).render('error', {page_title : "Error", error_message : "404 Not Found"});
    }
};

module.exports.SET_Request_User = (req, res, next) => {
    if(req.session.user_id)
    {
        User.findObjectById(req.session.user_id, (user) => {
            req.user = user; 
            req.logged_in = true;
            res.locals.logged_in = true;
            res.locals.user = user; 
            return next();
        }); 
    }
    else 
    {
        res.locals.logged_in = false;
        req.logged_in = false;
        return next();
    }
};

