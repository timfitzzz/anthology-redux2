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

describe('Tweet Redux', function() {

  describe('Tweet Actions', function(){

    before('Set up base state', function() {
      const store = configureStore();
      this.store = store;
    });


  });
});
