var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {

	passport.use('login', new LocalStrategy({
		usernameField : 'mail',
		passwordField : 'password',
		passReqToCallback : true
	},
	function(req, mail, password, done) {
		User.findOne({ 'mail' :  mail }, (err, user) => {
			if (err) return done(err);
			if (!user) return done(null, false, 'Adresse e-mail incorrect');
			if (!user.isValidPassword(password)) return done(null, false, 'Mot de passe incorrect');
			return done(null, user);
		});
	}));
}
