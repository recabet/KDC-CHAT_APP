const variables = require("./variables"); 

// Modules
const express = require("express");
const body_parser = require('body-parser');
const session = require('express-session');
const FileStore = require("session-file-store")(session);
const path = require("path");
const http = require("http");
const socket_io = require("socket.io");


// Routes 
const auth_router = require("./routes/auth");
const user_router = require("./routes/user");

// Controllers
const main_controller = require("./controllers/main"); 
const console_controller = require("./controllers/console"); 

// Models 
const Room = require("./models/room");

// Tools 
const rsa = require("./toolkit/rsa");

// Connections
const app = express();
const store = new FileStore({
    path : path.join(variables.database_path, "sessions")
});
const server = http.Server(app); 
const io = socket_io(server); 


// Settings
app.set('view engine', 'ejs');
app.set('views', 'views');

// Using the modules
app.use(body_parser.urlencoded({extended : false}));
app.use(express.static(path.join(variables.main_dir, "public")));
app.use(session({
    store: store,
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
})); 

/* Start handling */
app.use(console_controller.LOG_Request);
app.use(main_controller.SET_Request_User);

app.use(auth_router);
app.use(user_router);

app.use(main_controller.SEND_Info);
app.use(console_controller.LOG_Error);
app.use(main_controller.SEND_Error_Page); 
/* End handling */ 

/* Chat Server */
io.on('connection', (socket) => {
    // Joining a room
    socket.on('joinRoom', ({room, publicKey, username}) => {
        Room.findById(room, (the_room) => {
            if(the_room)
            {
                socket.join(room);

                io.to(room).emit('joinLeaveMessage', `${username} joined the room.`);

                const encryptedSessionKey = rsa.encrypt(publicKey, JSON.stringify(the_room.sessionKey));
                
                // Send encrypted session key to the user
                io.to(socket.id).emit('encryptedSessionKey', encryptedSessionKey);
            }
        });

    });
    
    socket.on('sendMessage', ({ room, message, username}) => {
        io.to(room).emit('message', {message: message, username: username});
        console.log(`Encrypted message from ${username} sent to room ${room}: ${message}`);
    });

    socket.on('hostLeftTheRoom', (roomId) => {
        Room.findByIdAndDelete(roomId, () => {
            io.to(roomId).emit('hostLeftTheRoom'); 
        });
    });

    socket.on('leaveRoom', ({roomId, username}) => {
        console.log(`${username} left from the room ${roomId}.`);
        io.to(roomId).emit('joinLeaveMessage', `${username} left from the room.`);
    });
});

server.listen(
    variables.port, 
    variables.hostname, 
    function(result)
    {
        console.log(`\nServer successfully started at http://${variables.hostname}:${variables.port}\n`);
    }
);
 
module.exports = server; 