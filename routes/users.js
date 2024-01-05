const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', user_controller.sign_up);

router.post('/login', user_controller.log_in);

module.exports = router;
