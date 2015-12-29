import passport from 'passport';
import { Strategy as LocalStrategy } from  'passport-local';
import { Strategy as TwitterStrategy } from  'passport-twitter';
import flash from 'connect-flash';
import session from 'express-session';
import User from  './models/user.js';
import twitterConfig from './config';
import _ from 'underscore';

export default function init(app) {

  passport.use(new TwitterStrategy({

    consumerKey:  twitterConfig.TWITTER_AUTH.TWITTER_KEY,
    consumerSecret: twitterConfig.TWITTER_AUTH.TWITTER_SECRET,
    callbackURL: twitterConfig.TWITTER_AUTH.TWITTER_CALLBACK

  },
  function(token, tokenSecret, profile, done) {
    // make the code asynchronous
    // User.findOne won't fire until we have all our data back from Twitter

    process.nextTick(function() {
      loginOrCreateNewUserAndLogin(token, profile, done);
    });

  }));

  // 'serializes' user
  passport.serializeUser(function(user, done) {
    console.log('serialize', user.id);
    done(null, user._id);
  });

  // deserialize user
  passport.deserializeUser(function(id, done) {

    console.log('deserializeUser', id);
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  // other passport config stuff, added to express app
  app.use(session({ secret: 'whoooo secret'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  return passport;

};

function loginOrCreateNewUserAndLogin(token, profile, done) {
  User.findOne({'accounts.twitter.id': profile.id}, function (err, user){

    if (err) {
      return done(err);
    }

    // if there's a user, log them in
    if (user) {
      console.log('user found:', user.id);
      return done(null, user); // user exists, so return them
    } else {
      // if there's no user, create one
      var newUser = createNewTwitterUser(profile, token);
      // save user in db
      newUser.save(function (err) {
        if (err) {
          throw err;
        }
        return done(null, newUser);
      });
    }

  });
}

function createNewTwitterUser(profile, token) {
  console.log('creating new Twitter user: ' + profile.username);
  var newUser = new User();
  //newUser.id = Users.
  newUser.accounts = {};
  newUser.accounts.twitter = _.assign({}, profile);
  if (profile.photos.length > 0) {
    newUser.accounts.twitter.picture = profile.photos[0].value;
  }
  newUser.tokens = {};
  newUser.tokens.twitter = token;
  console.log('new user: ', newUser);
  return newUser;
}
