import React from 'react';
import {Component} from 'react';
import moment from 'moment';
import _ from 'underscore';
import { Link } from 'react-router';

class SceneList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleting: []
    }
    this.handleControl = this.handleControl.bind(this);
  }


  componentWillReceiveProps() {
    var deleting = this.state.deleting;
    for (var scene in this.state.deleting) {
      if (!this.props.scenes[scene].deleting) {
        deleting = deleting.slice(deleting.indexOf(scene), 1)
      }
    }
    this.setState({
      deleting: deleting
    });
  }

  toggleFadeOnDelete(sceneId) {
    var that = this;
    var array = this.state.deleting;
    if (_.indexOf(array, sceneId) > -1) {
      return "scene-list-item deleting"
    } else {
      return "scene-list-item"
    }
  }

  renderListItems() {
    var listItems = this.props.scenes.user.map( sceneId => {
      return(
        <div className={this.toggleFadeOnDelete(sceneId)} key={sceneId}>
          <div className="list-item-title"><Link to={"/scene/" + sceneId}>{this.props.scenes[sceneId].name}</Link></div>
          <div className="list-item-dates">{"Begins at " + (this.props.scenes[sceneId].firstDate ? this.props.scenes[sceneId].firstDate : "\'date\'")}</div>
          <div className="list-item-created-at">{"Created at " + (this.props.scenes[sceneId].created_at ? moment(this.props.scenes[sceneId].created_at).format("dddd, MMMM Do YYYY, h:mm:ss a") : "")}</div>
          {this.renderItemControls(sceneId)}
        </div>
      )
    });
    return listItems.reverse();
  }

  renderItemControls(sceneId) {
    return(
      <div className="list-item-controls">
        <a className="edit-button" onClick={this.handleControl("edit", sceneId)}>Edit</a>
        <a className="delete-button" onClick={this.handleControl("delete", sceneId)}>Delete</a>
      </div>
    )
  }

  handleControl(type, sceneId) {
    var deleting = this.state.deleting.slice();
    var that = this;
    switch (type) {
      case 'edit':
        return function() {
          // this.props.editScene()
        }
      case 'delete':
        return function() {
          that.setState({deleting: deleting.push(sceneId)})
          that.props.handlers.deleteScene(sceneId)
        }
      default:
        return function() {
          console.log("misconfigured item control")
        }
    }
  }


  render() {
    if (this.props.scenes.user !== [] && typeof this.props.scenes[this.props.scenes.user[0]] === 'object') {
      return <div className="scene-list">{this.renderListItems()}</div>
    } else {
      return <div className="scene-list empty">You have no scenes yet!</div>
    }

  }

}

export default SceneList;
