const express = require('express');
const path = require('path');
const mainRouter = express.Router();

module.exports = (app) => {

	/* GET index.html Page */
	mainRouter.get('*', (req, res) => {
		res.sendFile(path.resolve(app.get('html')));
	});

	app.use('/', mainRouter);
}
