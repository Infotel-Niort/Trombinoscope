const express = require('express');
const User = require('../models/User');
const authRouter = express.Router();

var isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) return next();
	res.status(401).json({ success: false });
}

module.exports = (app, passport) => {

	/* GET isLoggedIn */
	authRouter.get('/islogged', (req, res) => {
		res.status(200).json({ isLogged: req.isAuthenticated(), user: req.user });
	});

	/* POST Handle Login */
	authRouter.post('/login', (req, res, next) => {
		passport.authenticate('login', (err, user, info) => {
			if (err) return res.status(500).json({ success: false });
			if (!user) return res.status(401).json({ message: info });
			user.save();
			req.logIn(user, (err) => {
				if (err) return res.status(500).json({ success: false });
				return res.status(200).json({ user: user });
			});
		});
	});

	/* POST Handle Registration */
	authRouter.post('/register', (req, res, next) => {
		passport.authenticate('signup', (err, user, info) => {
			if (err) return res.status(500).json({ success: false });
			if (!user) return res.status(401).json({ message: info });
			user.save(err => {
				if (err) return res.status(500).json({ success: false });
				req.logIn(user, (err) => {
					return res.status(200).json({ user: user });
				});
			});
		});
	});

	/* POST Handle Logout */
	authRouter.post('/logout', (req, res) => {
		req.logOut();
		res.status(200).json({ success: true });
	});

	app.use('/auth', authRouter);
}
