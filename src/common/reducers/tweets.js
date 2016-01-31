import {
  DOC_ADDED_TO_SCENE
} from '../actions/scenes.js'

export default function scenes(state = {}, action) {
  switch (action.type) {
    case DOC_ADDED_TO_SCENE:
      return Object.assign({}, state, {
          ...state,
          [action.document.id]: action.document
      });
    default:
      return state;
  }
}
