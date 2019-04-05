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

	app.use('/collaborateur', collaborateurRouter);
}
