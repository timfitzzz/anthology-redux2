import {
  GET_USER_SCENE_IDS, GET_USER_SCENE_IDS_FAILED, UPDATE_USER_SCENE_IDS, // users' scenes
  GET_SCENE_BRIEFS, GET_SCENE_BRIEFS_FAILED, UPDATE_SCENE_BRIEFS, // scenes in brief
  GET_SCENE, GET_SCENE_FAILED, UPDATE_SCENE, // scenes in full
  CREATE_SCENE, SCENE_CREATED, CREATE_SCENE_FAILED, // scene creation
  DELETE_SCENE, SCENE_DELETED, DELETE_SCENE_FAILED, // scene deletion
  ADD_DOC_TO_SCENE, DOC_ADDED_TO_SCENE, ADD_DOC_TO_SCENE_FAILED // adding docs to scene
} from '../actions/scenes.js'
import _ from 'underscore'

// Per-scene schema, for reference:
// var sceneSchema = new Schema({
//   id:  Number,
//   name: String,
//   documents: [{}], <-- { type: 'tweet' || 'note',
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
        newState[sceneBrief._id] = sceneBrief
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
    case DELETE_SCENE:
      var newState = Object.assign({}, state, {});
      newState[action.sceneId].deleting = true;
      return newState;
    case SCENE_DELETED:
      var newState = Object.assign({}, state, {});
      // remove from scenes
      delete newState[action.sceneId];
      // remove from user scene list
      newState.user = _.without(newState.user, action.sceneId);
      return newState;
    case DELETE_SCENE_FAILED:
      var newState = Object.assign({}, state, {});
      delete newState[action.sceneId].deleting;
      return newState;
    case ADD_DOC_TO_SCENE:                // TODO: implement loading
      return state;
    case ADD_DOC_TO_SCENE_FAILED:         // TODO: implement loading
      return state;
    case DOC_ADDED_TO_SCENE:
      var newState = Object.assign({}, state, {});
      newState[action.sceneId].documents.push({
        type: action.type,
        document: action.document,
        order_by: action.order_by
      });
      return newState;
    default:
      return state
  }
}
