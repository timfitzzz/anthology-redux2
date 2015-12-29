import {
  GET_USER_SCENE_IDS, GET_USER_SCENE_IDS_FAILED, UPDATE_USER_SCENE_IDS, // users' scenes
  GET_SCENE_BRIEFS, GET_SCENE_BRIEFS_FAILED, UPDATE_SCENE_BRIEFS, // scenes in brief
  GET_SCENE, GET_SCENE_FAILED, UPDATE_SCENE, // scenes in full
  CREATE_SCENE, SCENE_CREATED, CREATE_SCENE_FAILED
} from '../actions/scenes.js'
import _ from 'underscore'

// Per-scene schema, for reference:
// var sceneSchema = new Schema({
//   id:  Number,
//   name: String,
//   documents: [{}], <-- { type: 'twitter' || 'note',
//                          content: {document}
//                        }
//   created_by_user: String
// });

// Scenes will be stored in state as keys indexed by id.
// Userscenes will be delivered as an array by id.

export default function scenes(state = {
    user: []
  }, action) {
  switch (action.type) {

    case GET_USER_SCENE_IDS:
      return Object.assign({}, state, {
          ...state,
          user: ["fetching"]
      });
    case UPDATE_USER_SCENE_IDS:
      return Object.assign({}, state, {
          ...state,
          user: action.userScenes
      });
    case GET_USER_SCENE_IDS_FAILED:
      return Object.assign({}, state, {
          ...state,
          user: []
      });
    case GET_SCENE_BRIEFS:
      var loadingBriefs = {};
      _.map(action.ids, function(id) {
        loadingBriefs[id] = "fetching"
      });
      return Object.assign({}, state, {
          ...loadingBriefs
      });
    case UPDATE_SCENE_BRIEFS:
      var newState = Object.assign({}, state, {});
      _.map(action.sceneBriefs, function(sceneBrief) {
        newState[sceneBrief.id] = sceneBrief
      });
      return newState;
    case GET_SCENE_BRIEFS_FAILED:
      var newState = Object.assign({}, state, {});
      _.map(state, function(scene, index) {
          if (scene === "fetching") {
            delete newState[index]
          }
      });
      return newState;
    case GET_SCENE:
      var newState = Object.assign({}, state, {});
      newState[action.sceneId] = "fetching";
      return newState;
    case UPDATE_SCENE:
      var newState = Object.assign({}, state, {});
      newState[action.scene._id] = action.scene;
      return newState;
    case GET_SCENE_FAILED:
      var newState = Object.assign({}, state, {});
      _.map(state, function(scene, index) {
          if (scene === "fetching") {
            delete newState[index]
          }
      });
      return newState;
    case SCENE_CREATED:
      var newState = Object.assign({}, state, {});
      newState.user.push(action.sceneId);
      return newState;
    default:
      return state
  }
}
