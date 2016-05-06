import fetch from 'isomorphic-fetch';
import request from 'axios';
import Tweet from '../../server/models/tweet';

export const ADD_TWEETS = "ADD_TWEETS";
export const GET_RECENT_USER_TWEETS = "GET_RECENT_USER_TWEETS";

// addTweets: tweets [(Object)] -> ADD_TWEETS
// export function getUserSceneIds(userId) {
//   return dispatch => {
//     var action = {
//           type: GET_USER_SCENE_IDS,
//           userId,
//           promise: Scene.isStub === true
//                   ? request.post('http://127.0.0.1:3002/api/getUserSceneIds', { userId })
//                   : Scene.getUserSceneIds(userId)
//         };
//     dispatch(action);
//     return action;
//   }
// }

export function getRecentUserTweets(userId) {

  return (dispatch, getState) => {
    const { user } = getState();
    var action = {
      type: GET_RECENT_USER_TWEETS,
      promise: Tweet.isStub === true ?
               request.post('http://127.0.0.1:3002/twitter/getRecentUserTweets', { userId })
               : Tweet.getRecentUserTweets(user, userId)
    }
    dispatch(action);
    return action;
  }
}
