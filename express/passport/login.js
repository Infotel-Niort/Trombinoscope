var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');
var bCrypt = require('bcrypt-nodejs');

module.exports = (passport) => {
	passport.use('login', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
		passReqToCallback : true
	}, (req, email, password, done) => {
		User.findOne({ 'email' :  email }, (err, user) => {
			if (err) return done(err);
			if (!user) return done(null, false, 'Adresse e-mail incorrect');
			if (!user.isValidPassword(password)) return done(null, false, 'Mot de passe incorrect');
			return done(null, user);
		});
	}));
}
