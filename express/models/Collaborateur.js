var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var collaborateurSchema = mongoose.Schema({
  firstname           : String,
  lastname            : String,
  age                 : Number,
  picture             : String,
  job                 : String,
  mission             : String,
  skills              : [],
  meta                : {
    created           : Date,
    modified          : Date
  }
});

module.exports = mongoose.model('Collaborateur', collaborateurSchema);
