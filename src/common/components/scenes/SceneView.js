import React from 'react';
import {Component} from 'react';
import moment from 'moment';
import _ from 'underscore';
import { Link } from 'react-router';
import SceneHeader from './SceneView/SceneHeader';




class SceneView extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.scene) {
      this.loadScene();
    }
  }

  loadScene() {
      this.props.getScene(this.props.sceneId);
  }

  renderOrLoading() {
      if (!this.props.scene) {
        return (<span>Loading scene...</span>)
      }
      else {
        return this.renderScene();
      }
  }

  renderScene() {
    let sceneData = this.props.scene;
    return (
      <SceneHeader {...sceneData}/>
    )
  }

  render() {
    return (<div>
      {this.renderOrLoading()}
    </div>)
  }

}

export default SceneView;
