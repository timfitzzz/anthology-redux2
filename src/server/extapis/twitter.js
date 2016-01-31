import Twit from 'twit';
import { TWITTER_KEY, TWITTER_SECRET} from '../../../secrets';

// twit returns an api connection w/ methods. if no access_token or access_token_secret are provided, an app-only connection is made.

export function twit (access_token, access_token_secret) {


  if (!access_token || !access_token_secret) {
    var T = new Twit({
      consumer_key: TWITTER_KEY,
      consumer_secret: TWITTER_SECRET,
      app_only_auth: true
    });
    T.app_only = true;

  } else {
    var T = new Twit({
      consumer_key: TWITTER_KEY,
      consumer_secret: TWITTER_SECRET,
      access_token,
      access_token_secret
    });
  }

  return T;

}
