const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const settings = require('./express/settings');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');

mongoose.Promise = global.Promise;
mongoose.connect(settings.urlDB);

app.set('html', __dirname + '/dist/index.html');

app.use(morgan('dev', {
  skip: (req, res) => { return (res.statusCode == 304 || req.method == 'OPTIONS') }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(settings.secret));

app.use('/dist', express.static('dist'));
app.use('/assets', express.static('assets'));

// Configuring Passport
app.use(cookieSession({
  name: 'session',
  keys: ['leRoseauPlitMaisNeCedeQuandCasDePepin'],
  maxAge: 24 * 60 * 60 * 1000 * 30, // 1 month
}));
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
var initPassport = require('./express/passport/init');
initPassport(passport);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

require('./express/routes/auth')(app, passport);
require('./express/routes/main')(app);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.set('port', process.env.PORT || 8080);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
