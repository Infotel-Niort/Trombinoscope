const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');
const User = require('../models/User');
const bCrypt = require('bcrypt-nodejs');

function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

module.exports = passport => {
  passport.use('signup', new LocalStrategy({
    usernameField : 'mail',
    passwordField : 'password',
    passReqToCallback : true
  }, (req, mail, password, done) => {
    findOrCreateUser = () => {
      User.findOne({ 'mail' :  mail }, (err, user) => {
        if (err) return done(err);
        if (user) return done(null, false, 'Adresse e-mail déjà utilisée.');
        else {
          var newUser = new User({
            mail: req.body.mail,
            password: createHash(password),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mail: req.body.mail,
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
