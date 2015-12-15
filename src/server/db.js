var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var userSchema = new Schema({
  id:  Number,
  name: String,
  tokens: [],
  accounts: []
});

var User = mongoose.model('User', userSchema);

export default User;
