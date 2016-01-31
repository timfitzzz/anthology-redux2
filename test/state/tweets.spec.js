import React from 'react';
import addons from 'react/addons';
import expect from 'expect';
import request from 'axios';
import http from 'http';

import thunk from 'redux-thunk';
import promiseMiddleware from '../../src/common/api/promiseMiddleware';
import nock from 'nock';
import Mitm from 'mitm';
var mitm = Mitm();

import * as ScenesActions from '../../src/common/actions/scenes.js';
//import configureStore from '../../src/common/store/configureStore';
import configureStore from 'redux-mock-store';
import reducer from '../../src/common/reducers/tweets';

const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);

var tweets = {

  "tweet1": {
    text: "this is a tweet",
    user: "@diceytroop",
    date: new Date(),
    id: 'tweet1'
  },
  "tweet2": {
    text: "this is also a tweet",
    user: "@diceytroop",
    date: new Date(),
    id: 'tweet2'
  }
}




describe('Tweet Redux', function() {

  describe('Tweet Actions', function(){

    before('Set up base state', function() {
      const store = configureStore();
      this.store = store;
    });


  });



  describe('Tweets Reducer', function() {



    // SceneActions.addDocToScene -> dispatch({ type: 'DOC_ADDED_TO_SCENE',
      //                                         sceneId: String,
      //                                         document_type: 'tweet' || TBD,
      //                                         document: document_object,
      //                                         order_by: 'default' },)

      it('initializes with the default state', function() {


        expect(reducer(undefined, {})).toEqual({
        });
      });

    it('should respond to DOC_ADDED_TO_SCENE by adding tweet to store if doc is tweet', function() {

      expect(reducer([], {
        type: ScenesActions.DOC_ADDED_TO_SCENE,
        sceneId: 4,
        document_type: 'tweet',
        document: tweets.tweet1,
        order_by: 'default'
      })).toEqual({
        [tweets.tweet1.id]: tweets.tweet1
      });

    });

  })
});
