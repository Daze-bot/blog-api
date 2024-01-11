const express = require('express');
const router = express.Router();
const comment_controller = require('../controllers/commentController');
const passport = require('passport');

router.get('/', comment_controller.get_all_comments);

router.post('/', comment_controller.new_comment);

router.get('/:commentID', comment_controller.get_comment);

router.put('/:commentID', passport.authenticate('jwt', { session:false }), comment_controller.edit_comment);

router.delete('/:commentID', passport.authenticate('jwt', { session:false }), comment_controller.delete_comment);

module.exports = router;