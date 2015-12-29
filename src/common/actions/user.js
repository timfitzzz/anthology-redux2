export const AUTHORIZE_TWITTER = 'AUTHORIZE_TWITTER';
export const TWITTER_LOGIN = 'TWITTER_LOGIN';
export const TWITTER_FAILED = 'TWITTER_FAILED';
export const TWITTER_LOGOUT = 'TWITTER_LOGOUT';

import fetch from 'isomorphic-fetch';

export function authorizeTwitter() {
  return dispatch => {
    dispatch({type: AUTHORIZE_TWITTER});

  // TODO change url generic solution
    return fetch('http://127.0.0.1:3002/profile',{
      credentials: 'same-origin'
    })
      .then(checkStatusCode)
      .then(responseToJson)
      .then(data => {
        if (data._id && data.tokens.twitter){
          dispatch(twitterLogin(data))
          // TODO create more dumb components and move dispatcher to parent -> actionName=dispatch(actionName()) and then child will just call this! :)
          //window.history.pushState(null, null, '/')
        } else if (data === {}) {

        } else {ß
          handleError()
        }
      })
      .catch(handleError);

    // TODO abstract error handling to separate service
    function responseToJson(res){
      return res.json()
    }

    // TODO abstract error handling to separate service
    function checkStatusCode(res){
      if (res.status >= 400)
        throw new Error("Bad response from server");

      return res
    }

    function handleError(res){
      dispatch(twitterFailed())
      console.log('ended BADD!!! from authTwitter', res)
      //TODO : fix routing not through the window
      //window.history.pushState(null, null, '/login')
    }
  }
}

export function twitterLogin(data) {
  return {
    type: TWITTER_LOGIN,
    data: data
  }
}

export function twitterFailed() {
  return {
    type: TWITTER_FAILED
    //error:
  }
}

export function twitterLogout() {
  return {
    type: TWITTER_LOGOUT
  }
}
