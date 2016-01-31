import React from 'react';
import addons from 'react/addons';
import expect from 'expect';
import http from 'http';
import _ from 'underscore';

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

var default_state = {
  user: []
};

var userScenes = [1, 2, 3];

var sceneBriefs = {
  1: {_id: 1,
      name: "#PlatformCoop",
      created_by_user: "389880004"},
  2: { _id: 2,
       name: "#NYCGA",
       created_by_user: "389880004"},
  3: { _id: 3,
      name: "#PlatformCoop2",
       created_By_user: "389880004"}};

var sceneData = {
   1: { _id: 1,
        name: "#PlatformCoop",
        documents: [{ type: 'tweet', id: "tweet1"},
                    { type: 'tweet', id: "tweet2"}],
        created_by_user: "389880004" },
   2: { _id: 2,
         name: "#NYCGA",
         documents: [{ type: 'tweet', id: "tweet1"},
                     { type: 'tweet', id: "tweet2"}],
        created_by_user: "389880004" },
   3: { _id: 3,
         name: "#PlatformCoop",
         documents: [{ type: 'tweet', id: "tweet1"},
                     { type: 'tweet', id: "tweet2"}],
        created_by_user: "389880004" }};

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

describe('Scene Redux', function() {

  describe('Scene Actions', function(){

    before('Set up base state', function() {
      const store = configureStore();
      this.store = store;




    });

    describe('ScenesActions.getUserSceneIds(1) construction and async', function() {


      it('should dispatch GET_USER_SCENE_IDS, ' +
         '\n \t \t then UPDATE_USER_SCENE_IDS ' +
         '\n \t \t then GET_SCENE_BRIEFS ' +
         '\n \t \t then UPDATE_SCENE_BRIEFS on successful fetch', (done) => {

        var intercept = nock("http://127.0.0.1:3002")
                        .post("/api/getUserSceneIds")
                        .reply(200, { userScenes });

        var intercept2 = nock("http://127.0.0.1:3002")
                        .post("/api/getSceneBriefs")
                        .reply(200, sceneBriefs);

        const expectedActions = [{ type: 'GET_USER_SCENE_IDS', userId: "1" },
                                 { type: 'UPDATE_USER_SCENE_IDS', userId: "1", userScenes },
                                 { type: 'GET_SCENE_BRIEFS', ids: [1, 2, 3]},
                                 { type: 'UPDATE_SCENE_BRIEFS', sceneBriefs: sceneBriefs}];

        const store = mockStore(default_state, expectedActions, done);
        store.dispatch(ScenesActions.getUserSceneIds("1"));

      });


      it('should dispatch GET_USER_SCENE_IDS for user 1, \n \t \t then GET_USER_SCENE_IDS_FAILED on failed fetch', (done) => {

        var intercept = nock("http://127.0.0.1:3002")
                        .post("/api/getUserSceneIds")
                        .reply(401)

        const expectedActions = [{ type: 'GET_USER_SCENE_IDS', userId: "1" },
                        { type: 'GET_USER_SCENE_IDS_FAILED', error: new Error('Bad response from server') }];

        const store = mockStore(default_state, expectedActions, done);
        store.dispatch(ScenesActions.getUserSceneIds("1"));

      });

    });

    describe('ScenesActions.getSceneBriefs construction and async', function() {

      it('should dispatch GET_SCENE_BRIEFS with provided scenes \n \t \t and dispatch UPDATE_SCENE_BRIEFS upon successful fetch', function(done){

          var intercept = nock("http://127.0.0.1:3002")
                          .post("/api/getSceneBriefs")
                          .reply(200, sceneBriefs);
          const getState = {user: [1, 2, 3]}

          const scenes = [1, 2, 3];

          const expectedActions = [{type: 'GET_SCENE_BRIEFS', ids: scenes},
                                    {type: "UPDATE_SCENE_BRIEFS", sceneBriefs: sceneBriefs}];
          const store = mockStore(getState, expectedActions, done);
          store.dispatch(ScenesActions.getSceneBriefs(scenes));

      });

      it('should dispatch GET_SCENE_BRIEFS and \n \t \t then GET_SCENE_BRIEFS_FAILED with error on failed fetch', function(done) {

        var intercept = nock("http://127.0.0.1:3002")
                        .post("/api/getSceneBriefs")
                        .reply(401);

        const getState = {user: [1,2,3]}

        const expectedActions = [{ type: 'GET_SCENE_BRIEFS', ids: getState.user},
                                 { type: 'GET_SCENE_BRIEFS_FAILED', error: new Error('Bad response from server') }];
        const store = mockStore(getState, expectedActions, done);
        store.dispatch(ScenesActions.getSceneBriefs(getState.user));
      });

    });

    describe('ScenesActions.getScene construction and async', function() {

      it('should dispatch GET_SCENE with provided scene and \n \t \t dispatch UPDATE_SCENE on successful fetch', function(done) {

        var intercept = nock("http://127.0.0.1:3002")
                        .get("/api/getScene/1")
                        .reply(200, sceneData[1]);
        const getState = {user: [1,2,3], 1: sceneBriefs[1]};

        const expectedActions = [ { type: 'GET_SCENE', sceneId: 1 },
                                  { type: 'UPDATE_SCENE', scene: sceneData[1] }]

        const store = mockStore(getState, expectedActions, done);
        store.dispatch(ScenesActions.getScene(1));
      });

      it('should dispatch GET_SCENE with provided scene and \n \t \t dispatch GET_SCENE_FAILED on failed fetch', function(done) {

        var intercept = nock("http://127.0.0.1:3002")
                        .get("/api/getScene/1")
                        .reply(401);

        const getState = {user: [1,2,3], 1: sceneBriefs[1]};

        const expectedActions = [ { type: 'GET_SCENE', sceneId: 1},
                                  { type: 'GET_SCENE_FAILED', error: new Error('Bad response from server')} ];
        const store = mockStore(getState, expectedActions, done);
        store.dispatch(ScenesActions.getScene(1));


      });
    });

    describe('SceneActions.createScene construction and async', function() {

      it('should dispatch CREATE_SCENE with userId and name'
       + '\n \t \t and dispatch SCENE_CREATED on successful post'
       + '\n \t \t and dispatch GET_SCENE with received sceneId'
       + '\n \t \t abd dispatch UPDATE_SCENE with received scene data on successful fetch'
       , function(done) {

        var intercept = nock("http://127.0.0.1:3002")
                        .post("/api/createScene")
                        .reply(200, { sceneId: sceneBriefs[2].id });

        var intercept2 = nock("http://127.0.0.1:3002")
                          .get("/api/getScene/" + sceneBriefs[2].id)
                          .reply(200, sceneBriefs[2]);

        const getState = {user: [1, 2, 3], 1: sceneData[1]};

        const expectedActions = [ { type: 'CREATE_SCENE',
                                    userId: sceneBriefs[2].created_by_user,
                                    name: sceneBriefs[2].name
                                  },
                                  { type: 'SCENE_CREATED',
                                    sceneId: sceneBriefs[2].id},
                                  { type: 'GET_SCENE',
                                    sceneId: sceneBriefs[2].id},
                                  { type: 'UPDATE_SCENE',
                                    scene: sceneBriefs[2]}
                                  ]
        const store = mockStore(getState, expectedActions, done);
        store.dispatch(ScenesActions.createScene(sceneBriefs[2].created_by_user, sceneBriefs[2].name));


      });


      it('should dispatch CREATE_SCENE with userId and name \n \t \t+ dispatch CREATE_SCENE_FAILED on post fail', function(done) {

        var intercept = nock("http://127.0.0.1:3002")
                        .post("/api/createScene")
                        .reply(401);

        const getState = {user: [1, 2, 3], 1: sceneData[1]};

        const expectedActions = [ { type: 'CREATE_SCENE',
                                    userId: sceneBriefs[2].created_by_user,
                                    name: sceneBriefs[2].name},
                                  { type: 'CREATE_SCENE_FAILED',
                                    error: new Error('Bad response from server')}];

        const store = mockStore(getState, expectedActions, done);
        store.dispatch(ScenesActions.createScene(sceneBriefs[2].created_by_user, sceneBriefs[2].name));


      });

    });

    describe('SceneActions.getSceneDocs construction and async', function(done) {

      it('should dispatch GET_SCENE_DOCS with sceneId' +
          ' \n \t \t and dispatch UPDATE_SCENE_DOCS with sceneId, sceneDocs and docs', function() {

            var intercept = nock("http://127.0.0.1:3002")
                            .post("/api/getSceneDocs")
                            .reply({
                                      sceneId: sceneData[1]._id,
                                      sceneDocs: sceneData[1].documents,
                                      docs: _.map(sceneData[1].documents,
                                                  function(doc) {
                                                    return tweets[doc.id]
                                                  })
                                  });

            const getState = {user: [1, 2, 3], 1: sceneData[1]};

            const expectedActions = [ { type: 'GET_SCENE_DOCS',
                                        sceneId: sceneData[1]._id},
                                      { type: 'UPDATE_SCENE_DOCS',
                                        sceneId: sceneData[1]._id,
                                        sceneDocs: sceneData[1].documents,
                                        docs: _.map(sceneData[1].documents,
                                                  function(doc) {
                                                    return tweets[doc.id]
                                                  })                      } ]

            const store = mockStore(getState, expectedActions, done);
            store.dispatch(ScenesActions.getSceneDocs(sceneData[1]._id));

      });

      it('should dispatch GET_SCENE_DOCS with sceneId' +
        ' \n \t \t and dispatch GET_SCENE_DOCS_FAILED upon failed fetch', function(done) {

          var intercept = nock("http://127.0.0.1:3002")
                          .post("/api/getSceneDocs")
                          .reply(401);

          const getState = {user: [1, 2, 3], 1: sceneData[1]};

          const expectedActions = [ { type: 'GET_SCENE_DOCS',
                                      sceneId: sceneData[1]._id},
                                    { type: 'GET_SCENE_DOCS_FAILED',
                                      sceneId: sceneData[1]._id,
                                      error: new Error('Bad response from server')}]

          const store = mockStore(getState, expectedActions, done);
          store.dispatch(ScenesActions.getSceneDocs(sceneData[1]._id));


      });

    });

    describe('SceneActions.addDocToScene construction and async', function() {

      it('should dispatch ADD_DOC_TO_SCENE with document object, sceneId, document_type, and order_by'
          + '\n \t \t + dispatch DOC_ADDED_TO_SCENE with document object and sceneId on successful post'
          + '\n \t \t + dispatch GET_SCENE_DOCS with sceneId'
          + '\n \t \t + dispatch UPDATE_SCENE_DOCS with sceneId on successful post', function(done) {

            var document_object = {
               type: 'tweet',
               id: 'tweet_id',
               content: {
                 id: 'tweet_id',
                 text: 'this is a tweet '
               }
             }



            var intercept = nock("http://127.0.0.1:3002")
                            .post("/api/addDocToScene")
                            .reply(200, { sceneId: '4',
                                          document: document_object,
                                          document_type: document_object.type,
                                          order_by: 'default'});

            var intercept2 = nock("http://127.0.0.1:3002")
                             .post("/api/getSceneDocs")
                             .reply(200, {
                                       sceneId: '4',
                                       sceneDocs: [{type: 'tweet', id: 'tweet_id'}],
                                       docs: [document_object.content]
                                   });

            const getState = { user: [1, 2, 3], 1: sceneData[1], 4: { _id: '4', name: 'scene 4', documents: [], created_by_user: 'you know who'}};

            var document_object = {
               type: 'tweet',
               id: 'tweet_id',
               content: {
                 id: 'tweet_id',
                 text: 'this is a tweet '
               }
             }



            const expectedActions = [{ type: 'ADD_DOC_TO_SCENE',
                                       sceneId: '4',
                                       document: document_object,
                                       order_by: 'default'},
                                     { type: 'DOC_ADDED_TO_SCENE',
                                       sceneId: '4',
                                       document_type: 'tweet',
                                       document: document_object,
                                       order_by: 'default' },
                                     { type: 'GET_SCENE_DOCS',
                                       sceneId: '4'},
                                     { type: 'UPDATE_SCENE_DOCS',
                                       sceneId: '4',
                                       sceneDocs: [{ type: 'tweet', id: 'tweet_id'}],
                                       docs: [document_object.content]}]

            const store = mockStore(getState, expectedActions, done);
            store.dispatch(ScenesActions.addDocToScene(document_object, '4', "default"));

      });

      it('should dispatch ADD_DOC_TO_SCENE with document object, sceneId, document_type, and order_by'
          + '\n \t \t + dispatch ADD_DOC_TO_SCENE_FAILED with unsuccessful post', function(done) {

        var intercept = nock("http://127.0.0.1:3002")
                        .post("/api/addDocToScene")
                        .reply(401)

        const getState = {user: [1,2,3], 1: sceneData[1]}

        var document_object = {
          type: 'tweet',
          id: 'tweet_id',
          content: {
            id: 'tweet_id',
            text: 'this is a tweet'
          }
        }

        const expectedActions = [{ type: 'ADD_DOC_TO_SCENE',
                                   sceneId: '4',
                                   document: document_object,
                                   order_by: 'default'},
                                 {type: 'ADD_DOC_TO_SCENE_FAILED',
                                  sceneId: '4',
                                  document: document_object,
                                  error: new Error('Bad response from server')}]

        const store = mockStore(getState, expectedActions, done);
        store.dispatch(ScenesActions.addDocToScene(document_object, '4', "default"));
      });


    })

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

    it('handles GET_USER_SCENE_IDS_FAILED', function() {

      expect(reducer({
        user: ["fetching"]
      }, {type: 'GET_USER_SCENE_IDS_FAILED',
          error: 'error'}))
      .toEqual({
        user: []
      });
    });

    it('handles GET_SCENE_BRIEFS', function() {

      expect(reducer([], {
        type: 'GET_SCENE_BRIEFS',
        ids: [1,2,3]
      })).toEqual({
        1: "fetching",
        2: "fetching",
        3: "fetching"
      });

    });

    it('handles UPDATE_SCENE_BRIEFS', function() {

      expect(reducer([], {
        type: 'UPDATE_SCENE_BRIEFS',
        sceneBriefs: sceneBriefs
      })).toEqual({
        1: { _id: 1,
             name: "#PlatformCoop",
             created_by_user: "389880004"},
        2: { _id: 2,
             name: "#NYCGA",
             created_by_user: "389880004"},
        3: { _id: 3,
             name: "#PlatformCoop2",
             created_By_user: "389880004"}
      });
    });

    it('handles GET_SCENE_BRIEFS_FAILED', function() {

      expect(reducer({
                1: "fetching",
                2: "fetching",
                3: "fetching",
                4: { _id: 4,
                     name: "ooh a fourth one",
                     created_by_user: "389880004"}
              }, {
                type: 'GET_SCENE_BRIEFS_FAILED',
                error: new Error('error')}
      )).toEqual({
        4: { _id: 4,
             name: "ooh a fourth one",
             created_by_user: "389880004"}
      });
    });

    it('handles GET_SCENE', function() {

      expect(reducer({
              1: sceneData[1]
      }, { type: 'GET_SCENE',
           sceneId: 2}
      )).toEqual({
        1: sceneData[1],
        2: "fetching"
      });
    });

    it('handles UPDATE_SCENE', function() {

      expect(reducer({
        1: sceneData[1],
        2: "fetching"
      }, { type: 'UPDATE_SCENE',
           scene: sceneData[2]}
      )).toEqual({
        1: sceneData[1],
        2: sceneData[2]
      });

    });

    it('handles GET_SCENE_FAILED', function() {

      expect(reducer({
        1: sceneData[1],
        2: "fetching"
      }, { type: 'GET_SCENE_FAILED',
           error: new Error('whoops')}
      )).toEqual({
        1: sceneData[1]
      });

    });

    it('handles CREATE_SCENE', function() {

      expect(reducer({
        1: sceneData[1]
      }, { type: 'CREATE_SCENE',
           userId: sceneData[2].created_by_user,
           name: sceneData[2].name}
      )).toEqual({
        1: sceneData[1]
      });

      ///so this doesn't really do anything right now...

    });

    it('handles SCENE_CREATED', function() {

      expect(reducer({
        1: sceneData[1],
        user: [1]
      }, { type: 'SCENE_CREATED',
           sceneId: "2"}
      )).toEqual({
        1: sceneData[1],
        user: [1, 2]
      });

    });

    it('handles CREATE_SCENE_FAILED', function() {

      expect(reducer({
        1: sceneData[1],
        user: [1]
      }, { type: 'CREATE_SCENE_FAILED',
           error: new Error('whoops')}
      )).toEqual({
        1: sceneData[1],
        user: [1]
      });

      //this also doesn't really do anything right now

    });

    it('handles DOC_ADDED_TO_SCENE', function() {

      var newSceneData = Object.assign({}, sceneData[1], {});
      newSceneData.documents.push({
        type: 'tweet',
        document: tweets.tweet1
      });

      expect(reducer({
        1: sceneData[1],
        user: [1]
      }, { type: 'DOC_ADDED_TO_SCENE',
           sceneId: 1,
           type: 'tweet',
           document: tweets.tweet1,
           order_by: 'default'}
         )).toEqual({
           1: newSceneData,
           user: [1]
         });

    })

  });

});
