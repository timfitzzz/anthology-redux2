var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  tokens: Schema.Types.Mixed,
  accounts: Schema.Types.Mixed
});

var User = mongoose.model('User', userSchema);

export default User;
