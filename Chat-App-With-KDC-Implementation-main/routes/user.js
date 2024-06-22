const router = require("express").Router(); 

const user_controller = require("../controllers/user"); 

router.get('/', user_controller.GET_Home);
router.get('/profile', user_controller.GET_Profile);
router.get('/logout', user_controller.GET_Log_Out);
router.get('/rooms', user_controller.GET_Rooms);
router.get('/create_room', user_controller.GET_Create_Room);
router.get('/leaved_room', user_controller.GET_Leaved_Room);
router.get('/host_left', user_controller.GET_Host_Left);

router.post('/create_room', user_controller.POST_Create_Room);
router.post('/chatroom/:id', user_controller.POST_Chat_Room);

router.get('/chatroom/:id', user_controller.GET_Chat_Room);

module.exports = router;