import { bindActionCreators } from 'redux';
import React, { Component} from 'react';
import { connect } from 'react-redux';
import SceneView from '../components/scenes/SceneView';
import * as ScenesActions from '../actions/scenes';

var that = this;

var mapStateToProps = function(state, ownProps) {
  let sceneId = ownProps.params.id;
  let scene = state.scenes.present[sceneId];
  let user = state.user;
  console.log(scene);

  return {
    sceneId,
    scene,
    user
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ScenesActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SceneView);
