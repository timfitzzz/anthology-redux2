export const AUTHORIZE_TWITTER = 'AUTHORIZE_TWITTER';
export const TWITTER_LOGIN = 'TWITTER_LOGIN';
export const TWITTER_FAILED = 'TWITTER_FAILED';
export const TWITTER_LOGOUT = 'TWITTER_LOGOUT';

export function authorizeTwitter() {
  return {
    type: AUTHORIZE_TWITTER
  };
}

export function twitterLogin(data) {
  return {
    type: TWITTER_LOGIN,
    data
  }
}
