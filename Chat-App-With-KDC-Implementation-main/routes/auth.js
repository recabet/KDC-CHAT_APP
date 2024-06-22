const router = require("express").Router(); 

const auth_controller = require("../controllers/auth");

router.get('/login', auth_controller.GET_Login); 
router.get('/register', auth_controller.GET_Register);

router.post('/login', auth_controller.POST_Login);
router.post('/register', auth_controller.POST_Register);

module.exports = router;