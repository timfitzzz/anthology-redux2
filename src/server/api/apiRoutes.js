import map from 'underscore'
import User from '../models/user'
import Scene from '../models/scene'
var util = require('util');
import _ from 'underscore';

export function initApiRouter(app) {

  // routes for Scenes

  app.get('/api/getUserSceneIds/:userId', function(req, res) {
    const userId = req.params.userId || req.user.id;
    if (!req.isAuthenticated()) {
      console.log('not authenticated thats why the answer is 401')
      res.sendStatus(401);
    } else {
      if (userId === req.user.id) {  // only shows user's own scenes until consent-based sharing implemented
        Scene.find({created_by_user: userId}).then( function(response) {
          res.send(_.map(response, function(scene) { return scene.id }));
        });
      } else {
        res.sendStatus(403);
      }
    }

  });

  app.get('/api/getScene/:sceneId', function(req, res) {
    if (!req.isAuthenticated()) {
      res.sendStatus(401)
    } else {
      Scene.findById(req.params.sceneId, function(err, response) {
        console.log(response);
        if (response.created_by_user === req.user.id) {
          res.send(response)
        }
        else {
          res.sendStatus(403)
        }
      });
    }
  });

  app.post('/api/getSceneBriefs', function(req, res) {
    if (!req.isAuthenticated()) {
      res.sendStatus(401)
    } else {
      var sceneBriefs = [];
      req.body.ids.map(function(id, index) {
        if (index < (ids.length - 1)) {
          Scene.find({id: id}).then( function(response) {
            sceneBriefs.push(response);
          });
        } else {
          Scene.find({id: id}).then( function(response) {
            sceneBriefs.push(response);
            res.send(sceneBriefs);
          });
        }
      });
    }

  });

  app.post('/api/createScene', function(req, res) {
    if (!req.isAuthenticated()) {
      console.log(req.user)
      console.log('user not authenticated, sending 401');
      res.sendStatus(401)
    }
    else if (!req.body.name) {
      res.sendStatus(422)
    }
    else {
      var newScene = new Scene;
      newScene.name = req.body.name;
      newScene.created_at = new Date;
      newScene.created_by_user = req.user.id;
      console.log(util.inspect(newScene, false, null));
      newScene.save(function(err, newScene, numAffected) {
                      if(err) {
                        console.log(err);
                        res.sendStatus(500);
                      }
                      else {
                        console.log("NEw scene id:" + newScene.id);
                        console.log("numAffected equals " + numAffected);
                        res.send({
                          sceneId: newScene.id
                        })
                      }
                    });

    }
  });


}
