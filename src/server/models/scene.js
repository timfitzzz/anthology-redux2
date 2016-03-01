var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('underscore');

var sceneSchema = new Schema({
  name: String,
  documents: [{}],
  created_by_user: String,
  created_at: Date,
  geo: String,
});

sceneSchema.static('getUserSceneIds', function(userId) {
  var promise = this.find({created_by_user: userId}).then(function(res){
    var userScenes = _.map(res, function(scene) { return scene.id })
    console.log(userScenes);
    return {
      userScenes
    }
  })
  return promise;
});

sceneSchema.static('getSceneBriefs', function(sceneIds) {
  return this.find({ '_id': { $in: sceneIds } }, { docs: 0 }).exec();
});

var Scene = mongoose.model('Scene', sceneSchema);

export default Scene;
