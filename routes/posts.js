const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/postController');

router.get('/', post_controller.get_all_posts);

router.get('/:postID', post_controller.get_post);

router.post('/:postID', post_controller.new_post);

router.put('/:postID', post_controller.edit_post);

router.delete('/:postID', post_controller.delete_post);

module.exports = router;