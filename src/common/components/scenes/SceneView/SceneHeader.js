import React from 'react';
import {Component} from 'react';
import moment from 'moment';
import _ from 'underscore';
import { Link } from 'react-router';


class SceneHeader extends Component {

  renderSceneTitle() {
    return (
      <div className="scene-name">{this.props.name}</div>
    )
  }

  renderSceneDetails() {
    return (
    <div className="scene-created-by">Created by {this.props.created_by_user} at {moment(this.props.created_at).format("dddd, MM/DD/YYYY, h:mm:ss a")}</div>
    )
  }

  renderSceneControls() {
    return (
      <div className="scene-controls"></div>
    )
  }

  renderSceneHeaderLeft() {
    return (
      <div className="scene-header-left">
        {this.renderSceneTitle()}
        {this.renderSceneDetails()}
      </div>
    )
  }

  renderSceneHeaderRight() {
    return (
      <div className="scene-header-right">
        {this.renderSceneControls()}
      </div>
    )
  }

  render() {
      return (
        <div className="scene-header">
          {this.renderSceneHeaderLeft()}
          {this.renderSceneHeaderRight()}
        </div>
      )
  }


}

export default SceneHeader;
