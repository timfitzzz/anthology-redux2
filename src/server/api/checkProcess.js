import {
  GET_USER_SCENE_IDS, GET_USER_SCENE_IDS_FAILED, UPDATE_USER_SCENE_IDS, // users' scenes
  GET_SCENE_BRIEFS, GET_SCENE_BRIEFS_FAILED, UPDATE_SCENE_BRIEFS, // scenes in brief
  GET_SCENE, GET_SCENE_FAILED, UPDATE_SCENE, // scenes in full
  CREATE_SCENE, SCENE_CREATED, CREATE_SCENE_FAILED, // scene creation
  DELETE_SCENE, SCENE_DELETED, DELETE_SCENE_FAILED // scene deletion
} from '../../common/actions/scenes.js'
import Scene from '../models/scene'

export function checkProcess(action, callback) {

  // actions in the same form as the front-end, I guess?
  // { type: ACTION_TYPE, arg1: arg1, arg2: arg2 }

  switch (action.type) {

    case DELETE_SCENE:
      Scene.findById(action.sceneId, function(err, scene) {
        if (err) {
          callback({verdict: false, reason: "scene not found"});
        }
        else if (scene.created_by_user === action.userId) {
          callback({ verdict: true, reason: "user is creator of scene" });
        }
        else {
          callback({ verdict: false, reason: "user is not creator of scene"});
      }});
      break;
    default:
        callback({verdict: false, reason: "no result"});
  }

}
