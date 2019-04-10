const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const User = require('../models/User');
const bCrypt = require('bcrypt-nodejs');

function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

module.exports = passport => {
  passport.use('register', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, (req, email, password, done) => {
    findOrCreateUser = () => {
      User.findOne({ 'email' : email }, (err, user) => {
        if (err) return done(err);
        if (user) return done(null, false, 'Adresse e-mail déjà utilisée.');
        else {
          var newUser = new User({
            email: email,
            password: createHash(password),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            picture: '',
            meta: {
              created: new Date()
            }
          });
          newUser.save((err, savedUser) => {
            if (err) throw err;
            return done(null, savedUser);
          });
        }
      });
    };
    process.nextTick(findOrCreateUser);
  }));
}
