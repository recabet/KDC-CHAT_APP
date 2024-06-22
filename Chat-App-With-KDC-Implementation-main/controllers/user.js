const Room = require('../models/room'); 

module.exports.GET_Home = (req, res, next) => {
    return res.render('home', {page_title : "Home"});
};

module.exports.GET_Log_Out = (req, res, next) => {
    if (req.logged_in) 
    {
        req.session.user_id = undefined;
        req.info = "You have logged out successfully.";
        res.locals.logged_in = false;
        return next();
    }
    else 
    {
        req.error_message = "You have not logged in!";
        return next();
    }
}; 

module.exports.GET_Profile = (req, res, next) => {
    if(req.logged_in) 
    {
        return res.render('profile', {page_title : "Profile"});
    }
    else
    {
        return next();
    }
}; 

module.exports.GET_Rooms = (req, res, next) => {
    if(req.logged_in)
    {
        Room.findAll((rooms) => {
            res.render('rooms', {page_title : 'Rooms', rooms : rooms});
        });
    }
    else 
    {
        req.error_message = "You have not logged in!";
        return next();
    }
};

module.exports.GET_Create_Room = (req, res, next) => {
    if(req.logged_in)
    {
        res.render('create_room', {page_title : 'Create Room'});
    }
    else 
    {
        req.error_message = "You have not logged in!";
        return next();
    }
};

module.exports.POST_Create_Room = (req, res, next) => {
    if(req.logged_in)
    {
        const title = req.body.title; 
        const password = req.body.password;

        const room = new Room(title, password); 
        
        room.save(() => {
            res.render('chat_room', {page_title : 'Chat', room_id : room.id, delete_on_left : true});
        });
    }
    else 
    {
        req.error_message = "You have not logged in!";
        return next();
    }
};

module.exports.GET_Chat_Room = (req, res, next) => {
    if(req.logged_in)
    {
        const room_id = req.params.id;
        Room.findById(room_id, (room) => {
            if(room)
            {
                res.render('room_password', {page_title: 'Enter room password', room_id: room_id}); 
            }
            else 
            {
                req.error_message = "Room does not exist!";
                return next();
            }
        });
    }
    else 
    {
        req.error_message = "You have not logged in!";
        return next();
    }
};

module.exports.POST_Chat_Room = (req, res, next) => {
    if(req.logged_in)
    {
        const room_id = req.params.id;
        const password = req.body.password;

        Room.findById(room_id, (room) => {
            if(room && room.password == password)
            {
                res.render('chat_room', {page_title : "Chat", room_id : room_id, delete_on_left : false});
            }
            else if(room)
            {
                req.info = "Incorrect password!";
                return next();
            }
            else 
            {
                req.error_message = "Room does not exist!";
                return next();
            }
        });
    }
    else 
    {
        req.error_message = "You have not logged in!";
        return next();
    }
};  

module.exports.GET_Leaved_Room = (req, res, next) => {
    if(req.logged_in)
    {
        req.info = "You have left the room successfully!";
        return next();
    }
    else 
    {
        req.error_message = "You have not logged in!";
        return next();
    }
}; 

module.exports.GET_Host_Left = (req, res, next) => {
    if(req.logged_in)
    {
        req.info = "The host left the room.";
        return next();
    }
    else 
    {
        req.error_message = "You have not logged in!";
        return next();
    }
}; 