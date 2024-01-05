const Post = require('../models/post');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.get_posts = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find().sort({ dateAdded: -1 }).exec();

  res.json(allPosts);
});