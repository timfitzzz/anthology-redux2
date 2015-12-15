import {
  GET_USER_SCENE_IDS,
  UPDATE_USER_SCENE_IDS,
  GET_SCENE
} from '../actions/scenes.js'

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
    default:
      return state
  }
}
