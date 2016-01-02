import React from 'react';
import {Component} from 'react';
import moment from 'moment';

class SceneList extends Component {
  constructor(props) {
    super(props)
  }

  renderListItems() {
    var listItems = this.props.scenes.user.map( sceneId => {
      console.log("rendering " + this.props.scenes[sceneId].name);
      return(
        <div className="scene-list-item" key={sceneId}>
          <div className="list-item-title">{this.props.scenes[sceneId].name}</div>
          <div className="list-item-dates">{"Begins at " + (this.props.scenes[sceneId].firstDate ? this.props.scenes[sceneId].firstDate : "\'date\'")}</div>
          <div className="list-item-created-at">{"Created at " + (this.props.scenes[sceneId].created_at ? moment(this.props.scenes[sceneId].created_at).format("dddd, MMMM Do YYYY, h:mm:ss a") : "")}</div>
        </div>
      )
    });
    console.log(listItems);
    return listItems.reverse();
  }

  render() {
    console.log(this.props.scenes);
    if (this.props.scenes.user !== [] && typeof this.props.scenes[this.props.scenes.user[1]] === 'object') {
      return <div className="scene-list">{this.renderListItems()}</div>
    } else {
      return <div className="scene-list empty">You have no scenes yet!</div>
    }

  }

}

export default SceneList;
