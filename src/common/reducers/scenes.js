import {
  GET_USER_SCENE_IDS_REQUEST, GET_USER_SCENE_IDS_SUCCESS, GET_USER_SCENE_IDS_FAILURE, // users' scenes
  GET_SCENE_BRIEFS_REQUEST, GET_SCENE_BRIEFS_SUCCESS, GET_SCENE_BRIEFS_FAILURE, // scenes in brief
  GET_SCENE_REQUEST, GET_SCENE_SUCCESS, GET_SCENE_FAILURE, // scenes in full
  CREATE_SCENE_REQUEST, CREATE_SCENE_SUCCESS, CREATE_SCENE_FAILURE, // scene creation
  DELETE_SCENE_REQUEST, DELETE_SCENE_SUCCESS, DELETE_SCENE_FAILURE, // scene deletion
  ADD_DOC_TO_SCENE_REQUEST, ADD_DOC_TO_SCENE_SUCCESS, ADD_DOC_TO_SCENE_FAILURE // adding docs to scene
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

    case GET_USER_SCENE_IDS_REQUEST:
      return Object.assign({}, state, {
        ...state,
        user: ["fetching"]
      });
    case GET_USER_SCENE_IDS_SUCCESS:
      var newUserScenes;
      console.log("user scene success, result is " + JSON.stringify(action));
      if (!action.req.userScenes[0]) {
        console.log("no user scenes, setting user to none");
        newUserScenes = ["none"];
      }
      else {
        console.log("type of userScenes is " + typeof action.req.userScenes);
        console.log("seeing userScenes as populated, setting to received value");
        newUserScenes = action.req.userScenes;
      }
      return Object.assign({}, state, {
        ...state,
        user: newUserScenes
      });
    case GET_USER_SCENE_IDS_FAILURE:
      return Object.assign({}, state, {
        ...state,
        user: ["failed"]
      });
    case GET_SCENE_BRIEFS_REQUEST:
      var loadingBriefs = {};
      _.map(action.ids, function(id) {
        loadingBriefs[id] = "fetching"
      });
      return Object.assign({}, state, {
          ...loadingBriefs
      });
    case GET_SCENE_BRIEFS_SUCCESS:
      var newState = Object.assign({}, state, {});
      _.map(action.req, function(sceneBrief) {
        newState[sceneBrief._id] = sceneBrief
      });
      return newState;
    case GET_SCENE_BRIEFS_FAILURE:
      var newState = Object.assign({}, state, {});
      _.map(state, function(scene, index) {
          if (scene === "fetching") {
            delete newState[index]
          }
      });
      return newState;
    case GET_SCENE_REQUEST:
      var newState = Object.assign({}, state, {});
      newState[action.sceneId] = "fetching";
      return newState;
    case GET_SCENE_SUCCESS:
    console.log("dafasd " + JSON.stringify(action));
      var newState = Object.assign({}, state, {});
      newState[action.sceneId] = action.req;
      return newState;
    case GET_SCENE_FAILURE:
      var newState = Object.assign({}, state, {});
      _.map(state, function(scene, index) {
          if (scene === "fetching") {
            delete newState[index]
          }
      });
      return newState;
    case CREATE_SCENE_SUCCESS:
      var newState = Object.assign({}, state, {});
      newState.user.push(action.req.sceneId);
      newState[action.req.sceneId] = action.req.scene;
      return newState;
    case 'DELETE_SCENE':
        var newState = Object.assign({}, state, {});
        newState[action.sceneId].deleting = true;
        return newState;
    case DELETE_SCENE_REQUEST:
      var newState = Object.assign({}, state, {});
      newState[action.sceneId].deleting = true;
      return newState;
    case DELETE_SCENE_SUCCESS:
      var newState = Object.assign({}, state, {});
      // remove from scenes
      delete newState[action.sceneId];
      // remove from user scene list
      newState.user = _.without(newState.user, action.sceneId);
      return newState;
    case DELETE_SCENE_FAILURE:
      var newState = Object.assign({}, state, {});
      delete newState[action.sceneId].deleting;
      return newState;
    case ADD_DOC_TO_SCENE_REQUEST:                // TODO: implement loading
      return state;
    case ADD_DOC_TO_SCENE_FAILURE:         // TODO: implement loading
      return state;
    case ADD_DOC_TO_SCENE_SUCCESS:
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
