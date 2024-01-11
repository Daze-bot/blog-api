const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');
const passport = require('passport');

router.get('/', passport.authenticate('jwt', { session:false }), user_controller.get_users);

// The below route is not needed as new users won't be signing up

// router.post('/', user_controller.sign_up);

router.post('/login', user_controller.log_in);

router.get('/logout', user_controller.log_out);

module.exports = router;
