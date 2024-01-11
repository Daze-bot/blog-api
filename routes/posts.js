const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/postController');
const passport = require('passport');

router.get('/', post_controller.get_all_posts);

router.post('/', passport.authenticate('jwt', { session:false }), post_controller.new_post);

router.get('/:postID', post_controller.get_post);

router.put('/:postID', passport.authenticate('jwt', { session:false }), post_controller.edit_post);

router.delete('/:postID', passport.authenticate('jwt', { session:false }), post_controller.delete_post);

module.exports = router;