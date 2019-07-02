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

	/* PUT Update a Collaborateur */
	collaborateurRouter.post('/update/:id', isLoggedIn, (req, res) => {
		Collaborateur.findOne({ _id: req.params.id }, (err, collaborateur) => {
			if (err) res.status(500).json({ err: err });
			collaborateur.firstname = req.body.firstname != null ? req.body.firstname : collaborateur.firstname;
			collaborateur.lastname = req.body.lastname != null ? req.body.lastname : collaborateur.lastname;
			collaborateur.age = req.body.age != null ? req.body.age : collaborateur.age;
			collaborateur.picture = req.body.picture != null ? req.body.picture : collaborateur.picture;
			collaborateur.job = req.body.job != null ? req.body.job : collaborateur.job;
			collaborateur.mission = req.body.mission != null ? req.body.mission : collaborateur.mission;
			collaborateur.skills = req.body.skills != null ? req.body.skills : collaborateur.skills;
			collaborateur.joinedDate = req.body.joinedDate != null ? req.body.joinedDate : collaborateur.joinedDate;
			collaborateur.meta= {
					created: new Date(),
					modified: new Date()
			}
			collaborateur.save((err, c) => {
				if (err) res.status(500).json({ err: err });
				return res.status(200).json({ collaborateur: c });
			})
		});
	});

	/* GET One Collaborateur */
	collaborateurRouter.get('/:id', isLoggedIn, (req, res) => {
		Collaborateur.findOne({ _id: req.params.id }, (err, collaborateur) => {
			if (err) res.status(500).json({ err: err });
			return res.status(200).json({ collaborateur: collaborateur });
		});
	});

	/* POST Delete one Collaborateur */
	collaborateurRouter.post('/delete/:id', isLoggedIn, (req, res) => {
		Collaborateur.findOne({ _id: req.params.id }, (err, collaborateur) => {
			if (err) res.status(500).json({ err: err });

			collaborateur.delete((err, c) => {
				if (err) res.status(500).json({ err: err });
				return res.status(200).json();
			})
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
			joinedDate: req.body.joinedDate,
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
