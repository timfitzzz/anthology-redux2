var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('underscore');
var twit = require('twit');

var tweetSchema = new Schema({
  text: String,
  created_at: Date,
  id_str: String
});

tweetSchema.static('getRecentUserTweets', function(user, userId, callback) {

  var T = twit(user.tokens.twitter.token, user.tokens.twitter.tokenSecret);
  if (callback) {
    T.get('statuses/user_timeline', {user_id: userId, count: 200, include_rts: 1}, callback(err, data, response));
  } else {
    T.get('statuses/user_timeline', {user_id: userId, count: 200, include_rts: 1}, function(err, data, response){
      if (err) {
        return response;
      } else {
        return data;
      }
    });
  }

});

var Tweet = mongoose.model('Tweet', tweetSchema);

export default Tweet;
