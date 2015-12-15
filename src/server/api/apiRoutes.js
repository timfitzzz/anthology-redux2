import map from 'underscore'
import User from '../models/user'
import Scene from '../models/scene'

export function initApiRouter(app) {

  // routes for Scenes

  app.get('/api/getUserSceneIds/:userId', function(req, res) {
    const userId = req.params.userId;
    if (!req.isAuthenticated()) {
      res.send(401);
    } else {
      if (req.user.id === userId) {  // only shows user's own scenes until consent-based sharing implemented
        Scene.find({created_by_user: userId}).then( function(response) {
          res.send(map(response, function(scene) { return scene.id }));
        });
      } else {
        res.send(403);
      }
    }

  });

  app.get('/api/getScene/:sceneId', function(req, res) {
    if (!req.isAuthenticated()) {
      res.send(401)
    } else {
      Scene.find({id: sceneId}).then( function(response) {
        if (response.created_by_user === req.user.id) {
          res.send(response)
        }
        else {
          res.send(403)
        }
      });
    }
  });


}
