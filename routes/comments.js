const express = require('express');
const router = express.Router();
const comment_controller = require('../controllers/commentController');
const passport = require('passport');

router.get('/:postID/comments', comment_controller.get_all_comments);

router.post('/:postID/comments', comment_controller.new_comment);

router.get('/:postID/comments/:commentID', comment_controller.get_comment);

router.put('/:postID/comments/:commentID', passport.authenticate('jwt', { session:false }), comment_controller.edit_comment);

router.delete('/:postID/comments/:commentID', passport.authenticate('jwt', { session:false }), comment_controller.delete_comment);

module.exports = router;