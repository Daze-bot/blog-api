const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcryptjs');

exports.sign_up = asyncHandler(async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    const user = new User({
      username: req.body.username,
      username_lower: req.body.username.toLowerCase(),
      password: hashedPassword,
    });

    await user.save();
    res.json(null);
  });
});

exports.log_in = asyncHandler(async (req, res, next) => {
  res.json("need to do");
});