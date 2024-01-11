const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const User = require('../models/user');

passport.use(
  'login',
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username_lower: username.toLowerCase() });
      if (!user) {
        return done(null, false, { message: "User not found" });
      };
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      };
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

const opts = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ _id: jwt_payload.id });
      if (!user) {
        return done(null, false, { message: "User not found" });
      };
      return done(null, user);
    } catch(err) {
      return done(err)
    }
  })
);