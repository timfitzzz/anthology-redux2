import { GET_USER } from '../actions/scenes.js'

export default function users(state = {}, action) {
  switch (action.type) {
    case GET_USER:
      return Object.assign({}, state, {
        ...state,
        [action.userId]:  action.user
      });
    default:
      return state;
  }
}
