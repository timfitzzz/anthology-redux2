import { bindActionCreators } from 'redux';
import React, { Component} from 'react';
import { connect } from 'react-redux';
import SceneList from '../components/SceneList';
import * as SceneActions from '../actions/reddit';

Scenes.need = [
  SceneActions.getUserScenes();
]
