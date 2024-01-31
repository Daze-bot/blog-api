const Post = require('../models/post');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.get_all_posts = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find().sort({ dateAdded: -1 }).exec();

  if (allPosts == null) {
    res.json({
      "success": false,
      "message": "data not found",
      "data": {}
    });
  } else {
    res.json({
      "success": true,
      "message": "Data found",
      "data": allPosts
    });
  }
});

exports.get_post = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postID).exec();

  if (post == null) {
    res.json({
      "success": false,
      "message": "data not found",
      "data": {}
    });
  } else {
    res.json({
      "success": true,
      "message": "Data found",
      "data": post
    });
  }
});

exports.new_post = [
  body('postTitle', "Title must not be empty")
    .trim()
    .isLength({ min: 1 }),
  body('postTitle', "Title can not be more than 60 characters")
    .trim()
    .isLength({ max: 60 }),
  body('postText', "Post content must not be empty")
    .trim()
    .isLength({ min: 1 }),

  asyncHandler(async (req, res, next) => {
    const errors = [];

    const newPost = new Post({
      title: req.body.postTitle,
      text: req.body.postText,
      published: req.body.postPublished
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
        "data": newPost
      });
      return;
    } else {
      await newPost.save();
      res.json({
        "success": true,
        "message": "Post created successfully",
        "data": newPost
      });
    }
  }),
];

exports.edit_post = [
  body('postTitle', "Title must not be empty")
    .trim()
    .isLength({ min: 1 }),
  body('postTitle', "Title can not be more than 60 characters")
    .trim()
    .isLength({ max: 60 }),
  body('postText', "Post must not be empty")
    .trim()
    .isLength({ min: 1 }),

  asyncHandler(async (req, res, next) => {
    const errors = [];

    const updatedPost = new Post({
      title: req.body.postTitle,
      text: req.body.postText,
      published: req.body.postPublished,
      _id: req.params.postID,
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
        "data": updatedPost
      });
      return;
    } else {
      await Post.findByIdAndUpdate(req.params.postID, updatedPost, {});
      res.json({
        "success": true,
        "message": "Post edited successfully",
        "data": updatedPost
      });
    }
  }),
];

exports.delete_post = asyncHandler(async (req, res, next) => {
  await Post.findByIdAndDelete(req.params.postID);
  res.json({
    "success": true,
    "message": "Post deleted successfully",
    "data": {}
  });
});