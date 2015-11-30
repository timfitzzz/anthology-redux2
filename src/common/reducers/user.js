import { AUTHORIZE_TWITTER,
         TWITTER_LOGIN,
         TWITTER_FAILED,
         TWITTER_LOGOUT } from '../actions/user';

export default function user(state = {
  tokens: {},
  fetchingAuth: false
}, action) {
  switch (action.type) {
  case AUTHORIZE_TWITTER:
    return Object.assign({}, state, {fetchingAuth: true});
  case TWITTER_LOGIN:
    return state;
  case TWITTER_FAILED:
    return state;
  case TWITTER_LOGOUT:
    return state;
  default:
    return state;
  }
}
