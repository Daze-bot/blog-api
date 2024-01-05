const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/userController');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', user_controller.sign_up);

module.exports = router;
