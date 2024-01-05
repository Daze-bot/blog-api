const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('This is an API used for a Blog');
});

module.exports = router;