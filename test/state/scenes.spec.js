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
import reducer from '../../src/common/reducers/scenes';


const middlewares = [thunk, promiseMiddleware];
const mockStore = configureStore(middlewares);

describe('Scene Redux', function() {

  describe('Scene Actions', function(){

    before('Set up base state', function() {
      const store = configureStore();
      this.store = store;
      this.userScenes = [1, 2, 3];
      this.sceneData = {
        1: { name: "#PlatformCoop",
             documents: [{ type: 'twitter', content: { tweet_data: "tweet"}},
                         { type: 'twitter', content: { tweet_data: "tweet"}}],
             created_by_user: "389880004" },
        2: { name: "#NYCGA",
             documents: [{ type: 'twitter', content: { tweet_data: "tweet" }},
                         { type: 'twitter', content: { tweet_data: "tweet" }}],
             created_by_user: "389880004" },
        3: { name: "#PlatformCoop",
             documents: [{ type: 'twitter', content: { tweet_data: "tweet" }},
                         { type: 'twitter', content: { tweet_data: "tweet" }}],
             created_by_user: "389880004" }}

    });

    describe('ScenesActions.getUserSceneIds(1) construction and async', function() {


      it('should dispatch GET_USER_SCENE_IDS for user 1, then UPDATE_USER_SCENE_IDS on successful fetch', (done) => {

        var intercept = nock("http://127.0.0.1:3002")
                        .get("/api/getUserSceneIds/1")
                        .reply(200, {
                          userScenes: [1, 2, 3]
                        })

        const getState = { //initial state of store
          user: []
        }
        const userId = 1;

        const expectedActions = [{ type: 'GET_USER_SCENE_IDS', userId: userId },
                                 { type: 'UPDATE_USER_SCENE_IDS', userId: userId, userScenes: [1, 2, 3] }];

        const store = mockStore(getState, expectedActions, done);
        store.dispatch(ScenesActions.getUserSceneIds(userId));

      });


      it('should dispatch GET_USER_SCENE_IDS for user 1, then GET_USER_SCENE_IDS_FAILED on failed fetch', (done) => {

        var intercept = nock("http://127.0.0.1:3002")
                        .get("/api/getUserSceneIds/1")
                        .reply(401)

        const getState = {user: []}
        const userId = 1;

        const expectedActions = [{ type: 'GET_USER_SCENE_IDS', userId: userId },
                        { type: 'GET_USER_SCENE_IDS_FAILED', error: new Error('Bad response from server') }];

        const store = mockStore(getState, expectedActions, done);
        store.dispatch(ScenesActions.getUserSceneIds(userId));

      });

    });

  });

  describe('Scene Reducer', function() {

    it('initializes with the default state', function() {


      expect(reducer(undefined, {})).toEqual({
        user: []
      });
    });

    it('handles GET_USER_SCENE_IDS', function() {

      expect(reducer([], {
        type: 'GET_USER_SCENE_IDS',
        userId: 1
      })).toEqual({
        user: ["fetching"]
      });

    });

    it('handles UPDATE_USER_SCENE_IDS', function() {

      expect(reducer([], {
        type: 'UPDATE_USER_SCENE_IDS',
        userId: 1,
        userScenes: [1, 2, 3]
      })).toEqual({
        user: [1, 2, 3]
      });


    });


  });

});
