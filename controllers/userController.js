const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const bcrypt = require('bcryptjs');

exports.get_users = asyncHandler(async (req, res, next) => {
  const users = await User.find().exec();
  const usernames = users.map(x => x.username);
  res.json(usernames);
});

// The below code is not needed as new users won't be signing up

/* exports.sign_up = asyncHandler(async (req, res, next) => {
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
}); */

exports.log_in = asyncHandler(async (req, res, next) => {
  res.json("need to implement");
});

exports .log_out = asyncHandler(async (req, res, next) => {
  res.json("need to implement");
});