const express = require('express');
const path = require('path');
const Collaborateur = require('../models/Collaborateur');
const collaborateurRouter = express.Router();

var isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) return next();
	return res.status(401).json({ success: false });
}

module.exports = (app) => {

	/* GET All Collaborateurs */
	collaborateurRouter.get('/', isLoggedIn, (req, res) => {
		Collaborateur.find({}, (err, collaborateurs) => {
			if (err) res.status(500).json({ err: err });
			return res.status(200).json({ collaborateurs: collaborateurs });
		});
	});

	/* GET One Collaborateur */
	collaborateurRouter.get('/:id', isLoggedIn, (req, res) => {
		Collaborateur.findOne({ _id: req.params.id }, (err, collaborateur) => {
			if (err) res.status(500).json({ err: err });
			return res.status(200).json({ collaborateur: collaborateur });
		});
	});

	/* POST Add One Collaborateur */
	collaborateurRouter.post('/add', isLoggedIn, (req, res) => {
		var collaborateur = new Collaborateur({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			age: req.body.age,
			picture: req.body.picture,
			job: req.body.job,
			mission: req.body.mission,
			skills: req.body.skills,
			meta: {
				created: new Date(),
				modified: new Date()
			}
		});
		collaborateur.save((err, c) => {
			if (err) res.status(500).json({ err: err });
			return res.status(200).json({ collaborateur: c });
		})
	});

	app.use('/collaborateur', collaborateurRouter);
}
