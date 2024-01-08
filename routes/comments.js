const express = require('express');
const router = express.Router();
const comment_controller = require('../controllers/commentController');

router.get('/', comment_controller.get_all_comments);

router.get('/:commentID', comment_controller.get_comment);

router.post('/:commentID', comment_controller.new_comment);

router.put('/:commentID', comment_controller.edit_comment);

router.delete('/:commentID', comment_controller.delete_comment);

module.exports = router;