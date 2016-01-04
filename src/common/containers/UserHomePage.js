import { bindActionCreators } from 'redux';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as ScenesActions from '../actions/scenes';
import UserHome from '../components/UserHome';

UserHome.need = [
  ScenesActions.getSceneBriefs
]

var mapStateToProps = function(state) {

  let scenes = state.scenes.present;
  let userScenes = state.scenes.present.user;
  let user = state.user;

  return {
    userScenes,
    scenes,
    user
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ScenesActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
