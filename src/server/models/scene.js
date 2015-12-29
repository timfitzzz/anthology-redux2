var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sceneSchema = new Schema({
  name: String,
  documents: [{}],
  created_by_user: String,
  created_at: Date
});

var Scene = mongoose.model('Scene', sceneSchema);

export default Scene;
