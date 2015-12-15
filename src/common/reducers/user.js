import { AUTHORIZE_TWITTER,
         TWITTER_LOGIN,
         TWITTER_FAILED,
         TWITTER_LOGOUT } from '../actions/user';

export default function user(state = {
  tokens: {},
  accounts: {},
  fetchingAuth: false
}, action) {
  switch (action.type) {
  case AUTHORIZE_TWITTER:
    return (Object.assign({}, state, {fetchingAuth: true}));
  case TWITTER_LOGIN:
    var newstate = {
      tokens: {
        ...state.tokens
      },
      accounts: {
        ...state.accounts
      },
      fetchingAuth: false
    };
    newstate.tokens.twitter = action.data.token;
    newstate.accounts.twitter = action.data;
    return Object.assign({}, state, newstate);
  case TWITTER_FAILED:
    return (Object.assign({}, state, {fetchingAuth: false}));
  case TWITTER_LOGOUT:
    var newstate = {
      tokens: {
        ...state.tokens
      },
      accounts: {
        ...state.accounts
      },
      fetchingAuth: false
    }
    newstate.tokens.twitter = undefined;
    newstate.accounts.twitter = undefined;
    return (Object.assign({}, state, newstate));
  default:
    return state;
  }
}
