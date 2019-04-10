var login = require('./login');
var register = require('./register');
var User = require('../models/User');

module.exports = (passport) => {

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  login(passport);
  register(passport);
}
