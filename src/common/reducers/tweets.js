import {
  DOC_ADDED_TO_SCENE
} from '../actions/scenes.js'

import {
  GET_RECENT_USER_TWEETS
} from '../actions/tweets.js'

export default function scenes(state = {}, action) {
  switch (action.type) {
    case DOC_ADDED_TO_SCENE:
      return Object.assign({}, state, {
          ...state,
          [action.document.id]: action.document
      });
    // case LOAD_TWEETS:
    //   var newTweets = {};
    //   action.tweets.forEach(function(tweet) {
    //     newTweets[tweet.id] = tweet;
    //   })
    //   return Object.assign({}, state, newTweets)
    case GET_RECENT_USER_TWEETS:

    default:
      return state;
  }
}
