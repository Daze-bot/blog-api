const Comment = require('../models/comment');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.get_all_comments = asyncHandler(async (req, res, next) => {
  const allComments = await Comment.find({ post: req.params.postID }).sort({ dateAdded: -1 }).exec();

  if (allComments == null) {
    res.json({
      "success": false,
      "message": "data not found",
      "data": {}
    });
  } else {
    res.json({
      "success": true,
      "message": "Data found",
      "data": allComments
    });
  }
});

exports.get_comment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentID).exec();

  if (comment == null) {
    res.json({
      "success": false,
      "message": "data not found",
      "data": {}
    });
  } else {
    res.json({
      "success": true,
      "message": "Data found",
      "data": comment
    });
  }
});

exports.new_comment = [
  body('commentName', "Name must not be empty")
    .trim()
    .isLength({ min: 1 }),
  body('commentName', "Name can not be more than 25 characters")
    .trim()
    .isLength({ max: 25 }),
  body('commentText', "Comment must not be empty")
    .trim()
    .isLength({ min: 1 }),
  body('commentText', "Comment can not be more than 1400 characters")
    .trim()
    .isLength({ max: 1400 }),

  asyncHandler(async (req, res, next) => {
    const errors = [];

    const newComment = new Comment({
      name: req.body.commentName,
      text: req.body.commentText,
      post: req.params.postID,
    });

    const validationErrors = validationResult(req).array();
    validationErrors.forEach(err => {
      errors.push(err.msg);
    });

    if (errors.length > 0) {
      res.json({
        "success": false,
        "message": "Invalid form fields",
        "errors": errors,
        "data": newComment
      });
      return;
    } else {
      await newComment.save();
      res.json({
        "success": true,
        "message": "Comment created successfully",
        "data": newComment
      });
    }
  }),
];

exports.edit_comment = [
  body('commentName', "Name must not be empty")
    .trim()
    .isLength({ min: 1 }),
  body('commentName', "Name can not be more than 25 characters")
    .trim()
    .isLength({ max: 25 }),
  body('commentText', "Comment must not be empty")
    .trim()
    .isLength({ min: 1 }),
  body('commentText', "Comment can not be more than 1400 characters")
    .trim()
    .isLength({ max: 1400 }),

  asyncHandler(async (req, res, next) => {
    const errors = [];

    const updatedComment = new Comment({
      name: req.body.commentName,
      text: req.body.commentText,
      post: req.params.postID,
      _id: req.params.commentID,
    });

    const validationErrors = validationResult(req).array();
    validationErrors.forEach(err => {
      errors.push(err.msg);
    });

    if (errors.length > 0) {
      res.json({
        "success": false,
        "message": "Invalid form fields",
        "errors": errors,
        "data": updatedComment
      });
      return;
    } else {
      await Comment.findByIdAndUpdate(req.params.commentID, updatedComment, {});
      res.json({
        "success": true,
        "message": "Comment edited successfully",
        "data": updatedComment
      });
    }
  }),
];

exports.delete_comment = asyncHandler(async (req, res, next) => {
  await Comment.findByIdAndDelete(req.params.commentID);
  res.json({
    "success": true,
    "message": "Comment deleted successfully",
    "data": {}
  });
});