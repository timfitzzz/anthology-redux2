import express from 'express';

import webpack from 'webpack';
import webpackConfig from '../../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux';
import createLocation from 'history/lib/createLocation';
import { fetchComponentDataBeforeRender } from '../common/api/fetchComponentDataBeforeRender';

import configureStore from '../common/store/configureStore';
import { getUser } from '../common/api/user';
import routes from '../common/routes';
import packagejson from '../../package.json';

// add cookieParser, etc from other bp
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';

// mongoose
var MONGO_DB = require('./config').MONGO_DB;
var mongoose = require('mongoose');
mongoose.connect(MONGO_DB.MONGO_URI, function(err) {
  if (err) {throw err}
}); // connect to db



const app = express();
const renderFullPage = (html, initialState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Isomorphic Redux Example</title>
        <link rel="stylesheet" type="text/css" href="/static/app.css">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `;
}

app.use(bodyParser.json());

if(process.env.NODE_ENV !== 'production'){
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}else{
  app.use('/static', express.static(__dirname + '/../../dist'));
}

// add cookieparser for auth

app.use(cookieParser());

app.use(morgan('dev')); // log every request to the console
 // get information from html forms

// passport init
var passport = require('./passport')(app);
// twitter auth Routes
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/UserHome',
    failureRedirect: '/login',
    session: true
}));
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
app.get('/profile', function(req, res) {
  const response = req.user ? req.user : {}
  console.log('res -- profile', response)
  return res.send(response);
});
/* this is for debugging session data */
app.use(function(req, res, next) {
    console.log('-- session --');
    console.dir(req.session);
    console.log('-------------');
    console.log('-- cookies --');
    console.dir(req.cookies);
    console.log('-------------');
    console.log('-- signed cookies --');
    console.dir(req.signedCookies);
    console.log('-------------');
    next()
  });

// initialize API routes
import { initApiRouter } from './routes/apiRoutes';
initApiRouter(app);

// pretty sure this isn't in use.
// // route middleware to make sure a user is logged in
// function isLoggedIn(req, res, next) {
//
//   // if user is authenticated in the session, carry on
//   if (req.isAuthenticated())
//     return next();
//
//   // if they aren't redirect them to the login page
//   res.redirect('/login');
// };


app.get('/*', function (req, res) {

  console.log(req.user);

  const location = createLocation(req.url);

  // if(req.user !== undefined) {
  //
  //   var cache = [];
  //   console.log(JSON.stringify(req, function(key, value) {
  //   if (typeof value === 'object' && value !== null) {
  //       if (cache.indexOf(value) !== -1) {
  //           // Circular reference found, discard key
  //           return;
  //       }
  //       // Store value in our collection
  //       cache.push(value);
  //   }
  //     return value;
  //   }, 4));
  //   cache = null;
  // }

  match({ routes, location }, (err, redirectLocation, renderProps) => {



    if(err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if(!renderProps)
      return res.status(404).end('Not found');

    const store = configureStore({user : req.user});
    const InitialView = (
      <Provider store={store}>
          <RoutingContext {...renderProps} />
      </Provider>
    );

    store.renderToString(React, InitialView).done( html => {
      var pageToSend = renderFullPage(html, store.getState());
      console.log()
      res.status(200).end(pageToSend);
    })
    // .catch(err => {
    //   console.log("Error on render: " + err);
    //   res.status(400).end(renderFullPage("", {}));
    // })

    // //This method waits for all render component promises to resolve before returning to browser
    // fetchComponentDataBeforeRender(store.dispatch, renderProps.components, renderProps.params)
    //   .then(html => {
    //     const componentHTML = ReactDOMServer.renderToString(InitialView);
    //     const initialState = store.getState();
    //     // console.log('initial state: ' + JSON.stringify(initialState))
    //     var pageToSend = renderFullPage(componentHTML, initialState);
    //     res.status(200).end(pageToSend);
    //   })
    //   .catch(err => {
    //     console.log("Error on render: " + err)
    //     res.status(400).end(renderFullPage("",{}))
    //   });
  });

});

const server = app.listen(3002, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
