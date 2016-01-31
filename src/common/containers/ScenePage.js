import { bindActionCreators } from 'redux';
import React, { Component} from 'react';
import { connect } from 'react-redux';
import SceneView from '../components/scenes/SceneView';
import * as ScenesActions from '../actions/scenes';

SceneView.need = [
]


var mapStateToProps = function(state) {
  let sceneId = state.router.params.id;
  let scene = state.scenes.present[sceneId];
  console.log(scene);

  return {
    sceneId,
    scene
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ScenesActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SceneView);
