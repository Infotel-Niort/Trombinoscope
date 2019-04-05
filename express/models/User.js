var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  email               : String,
  password            : String,
  profile             : {
    type              : mongoose.Schema.Types.ObjectId,
    ref               : 'Collaborateur'
  },
  meta                : {
    created           : Date
  }
});

userSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
