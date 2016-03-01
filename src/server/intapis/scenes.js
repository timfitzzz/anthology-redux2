var Scene = require('../models/scene');

export function intGetScene(sceneId, callback) {
  Scene.findById(sceneId, callback);
}
