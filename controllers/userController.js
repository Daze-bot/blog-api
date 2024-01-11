const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');

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

exports.log_in = [
  body("username", "Please enter username")
    .trim()
    .isLength({ min: 1 }),
  body("password", "Please enter password")
    .trim()
    .isLength({ min: 1 }),

  asyncHandler(async (req, res, next) => {
    const errors = [];

    const validationErrors = validationResult(req).array();

    validationErrors.forEach(err => {
      errors.push(err.msg);
    });

    if (errors.length > 0) {
      res.json({
        "success": false,
        "message": "User credential fields empty",
        "errors": errors,
        "data": {
          "username": req.body.username,
        }
      });
      return;
    } else {
      passport.authenticate('login', (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          errors.push(info.message);
          res.json({
            "success": false,
            "message": "Invalid user credentials",
            "errors": errors,
            "data": {
              "username": req.body.username,
            }
          });
        } else {
          req.login(user, { session: false }, (err) => {
            if (err) {
              return next(err);
            }
            jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '4h' }, (err, token) => {
              if (err) {
                return next(err);
              }
              res.json({
                "success": true,
                "message": "User logged in",
                "token": token,
                "data": {}
              });
            });
          });
        }
      })(req, res, next);
    }
  }),
];

exports .log_out = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.json({
      "success": true,
      "message": "User logged out",
      "data": {}
    });
  });
});